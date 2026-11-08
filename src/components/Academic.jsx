import { useEffect, useMemo, useRef, useState } from 'react';
import { animate, motion, useInView } from 'framer-motion';
import { Sparkle } from './Deco';
import { Reveal, ease } from '../motion';
import { gpa, profile } from '../data';

/* ───────────────────────── IPK / GPA ───────────────────────── */
export function Gpa() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [shown, setShown] = useState(0);
  const has = typeof gpa.value === 'number' && gpa.value > 0;
  const ratio = has ? Math.min(gpa.value / gpa.scale, 1) : 0;

  useEffect(() => {
    if (!inView || !has) return undefined;
    const controls = animate(0, gpa.value, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: setShown,
    });
    return () => controls.stop();
  }, [inView, has]);

  return (
    <div className="panel gpa" ref={ref}>
      <div className="section-head plain">
        <h2 className="h-label">
          ACADEMIC RECORD <Sparkle size={13} className="spin" />
        </h2>
      </div>

      <div className="gpa-body">
        <div className="gpa-ring" role="img" aria-label={has ? `GPA ${gpa.value} out of ${gpa.scale}` : 'GPA not set'}>
          <svg viewBox="0 0 180 180">
            <circle cx="90" cy="90" r="78" className="gpa-track" />
            <motion.circle
              cx="90"
              cy="90"
              r="78"
              className="gpa-arc"
              pathLength={1}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: inView ? ratio : 0 }}
              transition={{ duration: 1.8, ease }}
            />
          </svg>
          <div className="gpa-num">
            <strong>{has ? shown.toFixed(2) : '–.––'}</strong>
            <small>/ {gpa.scale.toFixed(2)}</small>
          </div>
        </div>

        <div className="gpa-info">
          <h3>Cumulative GPA (IPK)</h3>
          <p>D-IV Informatics Engineering · Politeknik Negeri Malang</p>
          {gpa.asOf && <span className="gpa-asof">{gpa.asOf}</span>}
        </div>
      </div>

      {gpa.semesters.length > 0 && (
        <div className="gpa-sems" aria-label="GPA per semester">
          {gpa.semesters.map((s, i) => (
            <div key={s.label} className="gpa-sem">
              <span className="gpa-bar-wrap">
                <motion.span
                  className="gpa-bar"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: inView ? Math.min(s.value / gpa.scale, 1) : 0 }}
                  transition={{ duration: 1, delay: 0.3 + i * 0.1, ease }}
                />
              </span>
              <b>{s.value.toFixed(2)}</b>
              <small>{s.label}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ───────────────────────── GitHub ───────────────────────── */
const CACHE_MIN = 15;

function readCache(key) {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const { t, v } = JSON.parse(raw);
    return Date.now() - t < CACHE_MIN * 60000 ? v : null;
  } catch {
    return null;
  }
}
function writeCache(key, v) {
  try {
    sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), v }));
  } catch {
    /* abaikan */
  }
}

async function load(user, signal) {
  const key = `gh:${user}`;
  const cached = readCache(key);
  if (cached) return cached;

  const get = (url) =>
    fetch(url, { signal }).then((r) => {
      if (!r.ok) throw new Error(String(r.status));
      return r.json();
    });

  const [u, repos, contrib] = await Promise.allSettled([
    get(`https://api.github.com/users/${user}`),
    get(`https://api.github.com/users/${user}/repos?per_page=100&sort=pushed`),
    get(`https://github-contributions-api.jogruber.de/v4/${user}?y=last`),
  ]);

  const out = {
    user: u.status === 'fulfilled' ? u.value : null,
    repos: repos.status === 'fulfilled' ? repos.value : null,
    days: contrib.status === 'fulfilled' ? contrib.value.contributions : null,
  };
  if (out.user || out.repos || out.days) writeCache(key, out);
  return out;
}

function analyse(days) {
  if (!days?.length) return null;
  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));
  let total = 0;
  let active = 0;
  let longest = 0;
  let run = 0;
  for (const d of sorted) {
    total += d.count;
    if (d.count > 0) {
      active += 1;
      run += 1;
      longest = Math.max(longest, run);
    } else run = 0;
  }
  // streak berjalan: hari ini boleh masih 0 (belum sempat commit)
  let current = 0;
  let i = sorted.length - 1;
  if (sorted[i] && sorted[i].count === 0) i -= 1;
  for (; i >= 0 && sorted[i].count > 0; i -= 1) current += 1;

  // susun jadi kolom per minggu (Minggu–Sabtu)
  const weeks = [];
  let col = new Array(new Date(`${sorted[0].date}T00:00:00Z`).getUTCDay()).fill(null);
  for (const d of sorted) {
    col.push(d);
    if (col.length === 7) {
      weeks.push(col);
      col = [];
    }
  }
  if (col.length) weeks.push(col);

  const months = weeks.map((w, wi) => {
    const first = w.find(Boolean);
    const m = first ? new Date(`${first.date}T00:00:00Z`).toLocaleString('en', { month: 'short', timeZone: 'UTC' }) : '';
    const prev = wi > 0 ? weeks[wi - 1].find(Boolean) : null;
    const pm = prev ? new Date(`${prev.date}T00:00:00Z`).toLocaleString('en', { month: 'short', timeZone: 'UTC' }) : '';
    return wi === 0 || m !== pm ? m : '';
  });

  return { total, active, longest, current, weeks, months };
}

function languages(repos) {
  if (!repos) return [];
  const count = {};
  repos
    .filter((r) => !r.fork && r.language)
    .forEach((r) => {
      count[r.language] = (count[r.language] || 0) + 1;
    });
  const sum = Object.values(count).reduce((a, b) => a + b, 0);
  return Object.entries(count)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, n]) => ({ name, pct: Math.round((n / sum) * 100) }));
}

function Stat({ label, value }) {
  return (
    <div className="gh-stat">
      <strong>{value ?? '–'}</strong>
      <small>{label}</small>
    </div>
  );
}

export function GitHubActivity() {
  const user = profile.github;
  const url = `https://github.com/${user}`;
  const [data, setData] = useState({ status: 'loading' });
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    if (!user) {
      setData({ status: 'error' });
      return undefined;
    }
    const ctrl = new AbortController();
    load(user, ctrl.signal)
      .then((r) => {
        if (!ctrl.signal.aborted) setData({ status: r.user || r.repos || r.days ? 'ok' : 'error', ...r });
      })
      .catch(() => {
        if (!ctrl.signal.aborted) setData({ status: 'error' });
      });
    return () => ctrl.abort();
  }, [user]);

  const act = useMemo(() => analyse(data.days), [data.days]);
  const langs = useMemo(() => languages(data.repos), [data.repos]);
  const stars = data.repos ? data.repos.reduce((s, r) => s + (r.stargazers_count || 0), 0) : null;

  return (
    <div className="panel gh" ref={ref}>
      <div className="section-head">
        <h2 className="h-label">
          GITHUB ACTIVITY <Sparkle size={13} className="spin" />
        </h2>
        <a className="link-arrow" href={url} target="_blank" rel="noreferrer">
          @{user.toUpperCase()} <span>↗</span>
        </a>
      </div>

      <div className="gh-body">
        {data.status === 'loading' && (
          <div className="gh-skeleton" aria-busy="true">
            <span /> <span /> <span />
          </div>
        )}

        {data.status === 'error' && (
          <p className="gh-error">
            GitHub activity can’t be loaded right now. You can see it directly on my profile.
          </p>
        )}

        {data.status === 'ok' && (
          <>
            <div className="gh-stats">
              <Stat label="CONTRIBUTIONS · LAST YEAR" value={act?.total.toLocaleString('en')} />
              <Stat label="ACTIVE DAYS" value={act?.active} />
              <Stat label="LONGEST STREAK" value={act ? `${act.longest} d` : null} />
              <Stat label="CURRENT STREAK" value={act ? `${act.current} d` : null} />
              <Stat label="PUBLIC REPOS" value={data.user?.public_repos ?? data.repos?.length} />
              <Stat label="FOLLOWERS" value={data.user?.followers} />
              {stars !== null && <Stat label="STARS" value={stars} />}
            </div>

            {act && (
              <div className="gh-scroll">
                <div className={`gh-heat${inView ? ' in' : ''}`} style={{ '--n': act.weeks.length }}>
                  <div className="gh-months">
                    {act.months.map((m, i) => (
                      <span key={i}>{m}</span>
                    ))}
                  </div>
                  <div className="gh-grid">
                    {act.weeks.map((w, wi) =>
                      Array.from({ length: 7 }).map((_, di) => {
                        const d = w[di];
                        return d ? (
                          <i
                            key={`${wi}-${di}`}
                            className={`lv${d.level}`}
                            style={{ '--w': wi }}
                            title={`${d.count} contribution${d.count === 1 ? '' : 's'} on ${d.date}`}
                          />
                        ) : (
                          <i key={`${wi}-${di}`} className="empty" />
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            )}

            {langs.length > 0 && (
              <div className="gh-langs">
                <span className="gh-langs-label">TOP LANGUAGES</span>
                {langs.map((l, i) => (
                  <div className="gh-lang" key={l.name}>
                    <span>{l.name.toUpperCase()}</span>
                    <span className="gh-lang-bar">
                      <motion.b
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: inView ? Math.max(l.pct, 4) / 100 : 0 }}
                        transition={{ duration: 1, delay: 0.2 + i * 0.1, ease }}
                      />
                    </span>
                    <em>{l.pct}%</em>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        <Reveal>
          <a className="pill" href={url} target="_blank" rel="noreferrer">
            VIEW GITHUB PROFILE <span>↗</span>
          </a>
        </Reveal>
      </div>
    </div>
  );
}