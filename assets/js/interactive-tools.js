/**
 * MS Big Data Interactive Learning Platform
 * Advanced Interactive Tools: SQL Engine, Cluster Sizer, Architecture Simulator, Medallion Inspector
 */

(function () {
  'use strict';

  // Sample Databases for SQL Playground
  const SAMPLE_DATABASE = {
    orders: [
      { order_id: 1001, customer_id: 'C_942', amount: 142.50, status: 'COMPLETED', country: 'US', order_date: '2026-08-10' },
      { order_id: 1002, customer_id: 'C_319', amount: 89.00,  status: 'COMPLETED', country: 'CA', order_date: '2026-08-10' },
      { order_id: 1003, customer_id: 'C_811', amount: 499.99, status: 'PENDING',   country: 'US', order_date: '2026-08-11' },
      { order_id: 1004, customer_id: 'C_942', amount: 35.20,  status: 'COMPLETED', country: 'US', order_date: '2026-08-12' },
      { order_id: 1005, customer_id: 'C_502', amount: 1250.00,status: 'COMPLETED', country: 'DE', order_date: '2026-08-12' },
      { order_id: 1006, customer_id: 'C_118', amount: 74.30,  status: 'CANCELLED', country: 'UK', order_date: '2026-08-13' },
      { order_id: 1007, customer_id: 'C_319', amount: 215.00, status: 'COMPLETED', country: 'CA', order_date: '2026-08-14' },
      { order_id: 1008, customer_id: 'C_674', amount: 620.40, status: 'COMPLETED', country: 'FR', order_date: '2026-08-14' }
    ],
    clickstream: [
      { event_id: 'EV_01', session_id: 'S_901', user_id: 'U_11', page: '/product/laptop', duration_sec: 45, device: 'mobile' },
      { event_id: 'EV_02', session_id: 'S_901', user_id: 'U_11', page: '/checkout',       duration_sec: 120, device: 'mobile' },
      { event_id: 'EV_03', session_id: 'S_902', user_id: 'U_44', page: '/home',           duration_sec: 15, device: 'desktop' },
      { event_id: 'EV_04', session_id: 'S_903', user_id: 'U_82', page: '/category/audio', duration_sec: 60, device: 'tablet' },
      { event_id: 'EV_05', session_id: 'S_904', user_id: 'U_95', page: '/product/phone',  duration_sec: 90, device: 'desktop' }
    ],
    sensor_telemetry: [
      { sensor_id: 'IOT_NODE_01', cluster_id: 'NORTH_DC', temp_c: 24.2, cpu_pct: 68.4, mem_pct: 82.1, status: 'HEALTHY' },
      { sensor_id: 'IOT_NODE_02', cluster_id: 'NORTH_DC', temp_c: 29.8, cpu_pct: 94.2, mem_pct: 91.5, status: 'WARNING' },
      { sensor_id: 'IOT_NODE_03', cluster_id: 'SOUTH_DC', temp_c: 21.5, cpu_pct: 42.0, mem_pct: 55.3, status: 'HEALTHY' },
      { sensor_id: 'IOT_NODE_04', cluster_id: 'WEST_DC',  temp_c: 34.1, cpu_pct: 98.7, mem_pct: 96.0, status: 'CRITICAL' }
    ]
  };

  // Mini In-Browser SQL Query Engine
  function runSimpleSQL(query) {
    const start = performance.now();
    const clean = query.trim().replace(/;+$/, '');
    
    // Identify table
    let tableKey = 'orders';
    if (/from\s+clickstream/i.test(clean)) tableKey = 'clickstream';
    else if (/from\s+sensor_telemetry/i.test(clean)) tableKey = 'sensor_telemetry';
    
    let dataset = [...SAMPLE_DATABASE[tableKey]];
    
    // Basic WHERE filter
    if (/where\s+status\s*=\s*'([^']+)'/i.test(clean)) {
      const match = clean.match(/where\s+status\s*=\s*'([^']+)'/i);
      const val = match[1];
      dataset = dataset.filter(r => String(r.status).toLowerCase() === val.toLowerCase());
    } else if (/where\s+amount\s*>\s*(\d+)/i.test(clean)) {
      const match = clean.match(/where\s+amount\s*>\s*(\d+)/i);
      const num = parseFloat(match[1]);
      dataset = dataset.filter(r => (r.amount || 0) > num);
    } else if (/where\s+country\s*=\s*'([^']+)'/i.test(clean)) {
      const match = clean.match(/where\s+country\s*=\s*'([^']+)'/i);
      const val = match[1];
      dataset = dataset.filter(r => String(r.country).toLowerCase() === val.toLowerCase());
    }

    // Aggregations
    if (/count\(\*\)/i.test(clean) && /group\s+by\s+(\w+)/i.test(clean)) {
      const groupMatch = clean.match(/group\s+by\s+(\w+)/i);
      const groupCol = groupMatch[1];
      const groups = {};
      dataset.forEach(r => {
        const key = r[groupCol] || 'UNKNOWN';
        if (!groups[key]) groups[key] = { [groupCol]: key, count: 0, total_amount: 0 };
        groups[key].count += 1;
        if (r.amount) groups[key].total_amount += r.amount;
      });
      dataset = Object.values(groups).map(g => {
        if (g.total_amount) g.total_amount = Math.round(g.total_amount * 100) / 100;
        return g;
      });
    }

    // LIMIT
    if (/limit\s+(\d+)/i.test(clean)) {
      const limitMatch = clean.match(/limit\s+(\d+)/i);
      dataset = dataset.slice(0, parseInt(limitMatch[1], 10));
    }

    const elapsed = (performance.now() - start).toFixed(2);
    return { rows: dataset, time: elapsed, rowCount: dataset.length, sourceTable: tableKey };
  }

  // Initialize Interactive SQL Playground
  function initSQLPlayground() {
    const container = document.getElementById('sqlPlaygroundWidget');
    if (!container) return;

    container.innerHTML = `
      <div class="interactive-widget-box">
        <div class="widget-header">
          <div class="widget-title">
            <span>⚡</span> Interactive Big Data SQL & Analytics Playground
          </div>
          <span class="widget-badge">In-Browser Engine</span>
        </div>
        <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 1rem;">
          Test analytical queries against sample partitioned data tables: <code>orders</code>, <code>clickstream</code>, or <code>sensor_telemetry</code>.
        </p>
        <div class="sql-editor-container">
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <button class="btn btn-sm sql-preset-btn" data-sql="SELECT country, COUNT(*) AS count, SUM(amount) AS total_amount FROM orders GROUP BY country;">Query 1: Group By Country</button>
            <button class="btn btn-sm sql-preset-btn" data-sql="SELECT * FROM orders WHERE status = 'COMPLETED' LIMIT 5;">Query 2: Filter Completed Orders</button>
            <button class="btn btn-sm sql-preset-btn" data-sql="SELECT * FROM sensor_telemetry WHERE status = 'CRITICAL';">Query 3: Critical IoT Sensors</button>
          </div>
          <textarea class="sql-textarea" id="sqlEditor">SELECT country, COUNT(*) AS count, SUM(amount) AS total_amount FROM orders GROUP BY country;</textarea>
          <div class="sql-actions">
            <button class="btn btn-primary" id="sqlRunBtn">▶ Execute Query</button>
            <button class="btn btn-sm" id="sqlClearBtn">Reset</button>
            <span id="sqlExecutionMeta" style="font-size: 0.8rem; color: var(--accent-emerald); font-family: var(--font-mono);"></span>
          </div>
          <div id="sqlOutputContainer" style="overflow-x: auto;"></div>
        </div>
      </div>
    `;

    const editor = container.querySelector('#sqlEditor');
    const runBtn = container.querySelector('#sqlRunBtn');
    const clearBtn = container.querySelector('#sqlClearBtn');
    const output = container.querySelector('#sqlOutputContainer');
    const meta = container.querySelector('#sqlExecutionMeta');

    function execute() {
      const q = editor.value;
      const res = runSimpleSQL(q);
      meta.textContent = `Executed in ${res.time} ms · ${res.rowCount} rows returned`;

      if (res.rows.length === 0) {
        output.innerHTML = `<div style="padding: 1rem; color: var(--text-muted); font-size: 0.85rem;">Query returned 0 rows.</div>`;
        return;
      }

      const cols = Object.keys(res.rows[0]);
      output.innerHTML = `
        <table class="sql-result-table">
          <thead>
            <tr>${cols.map(c => `<th>${c}</th>`).join('')}</tr>
          </thead>
          <tbody>
            ${res.rows.map(r => `
              <tr>${cols.map(c => `<td>${r[c] !== undefined ? r[c] : 'NULL'}</td>`).join('')}</tr>
            `).join('')}
          </tbody>
        </table>
      `;
    }

    runBtn.addEventListener('click', execute);
    clearBtn.addEventListener('click', () => {
      editor.value = `SELECT * FROM orders LIMIT 5;`;
      execute();
    });

    container.querySelectorAll('.sql-preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        editor.value = btn.getAttribute('data-sql');
        execute();
      });
    });

    execute();
  }

  // Initialize Cluster Sizing & FinOps Calculator
  function initClusterCalculator() {
    const container = document.getElementById('clusterCalculatorWidget');
    if (!container) return;

    container.innerHTML = `
      <div class="interactive-widget-box">
        <div class="widget-header">
          <div class="widget-title">
            <span>📐</span> Distributed Cluster Sizing & Cloud FinOps Sizer
          </div>
          <span class="widget-badge">Cost & Capacity Modeler</span>
        </div>
        <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 1.25rem;">
          Estimate compute nodes, RAM, IOPS, and cloud cost for an Apache Spark + Iceberg / HDFS big data cluster.
        </p>
        <div class="calculator-grid">
          <div class="calc-control">
            <label>Raw Data Volume: <span id="valDataVol">50 TB</span></label>
            <input type="range" class="calc-slider" id="sliderDataVol" min="1" max="500" value="50">
          </div>
          <div class="calc-control">
            <label>Daily Growth Rate: <span id="valGrowth">5%</span></label>
            <input type="range" class="calc-slider" id="sliderGrowth" min="1" max="25" value="5">
          </div>
          <div class="calc-control">
            <label>Storage Replication Factor: <span id="valRepl">3x</span></label>
            <input type="range" class="calc-slider" id="sliderRepl" min="1" max="3" value="3">
          </div>
          <div class="calc-control">
            <label>Concurrent Spark Jobs: <span id="valJobs">10</span></label>
            <input type="range" class="calc-slider" id="sliderJobs" min="1" max="50" value="10">
          </div>
        </div>
        <div class="calc-results">
          <div class="calc-result-stat">
            <span class="calc-stat-val" id="statNodes">12</span>
            <span class="calc-stat-label">Worker Nodes (r6g.2xlarge)</span>
          </div>
          <div class="calc-result-stat">
            <span class="calc-stat-val" id="statRAM">768 GB</span>
            <span class="calc-stat-label">Total Cluster RAM</span>
          </div>
          <div class="calc-result-stat">
            <span class="calc-stat-val" id="statStorage">150 TB</span>
            <span class="calc-stat-label">Raw S3/HDFS Footprint</span>
          </div>
          <div class="calc-result-stat">
            <span class="calc-stat-val" id="statCost" style="color: var(--accent-emerald);">$4,680 / mo</span>
            <span class="calc-stat-label">Estimated Cloud Spend</span>
          </div>
        </div>
      </div>
    `;

    const sliderVol = container.querySelector('#sliderDataVol');
    const sliderGrowth = container.querySelector('#sliderGrowth');
    const sliderRepl = container.querySelector('#sliderRepl');
    const sliderJobs = container.querySelector('#sliderJobs');

    function calculate() {
      const vol = parseInt(sliderVol.value, 10);
      const growth = parseInt(sliderGrowth.value, 10);
      const repl = parseInt(sliderRepl.value, 10);
      const jobs = parseInt(sliderJobs.value, 10);

      container.querySelector('#valDataVol').textContent = `${vol} TB`;
      container.querySelector('#valGrowth').textContent = `${growth}%`;
      container.querySelector('#valRepl').textContent = `${repl}x`;
      container.querySelector('#valJobs').textContent = `${jobs}`;

      const totalStorage = vol * repl;
      const nodes = Math.max(2, Math.ceil((vol * 1.5) / 8 + jobs * 0.8));
      const ram = nodes * 64; // 64 GB per worker
      // Estimate: $0.40/hr per worker + $0.021/GB S3/storage
      const computeMonthly = nodes * 0.40 * 730;
      const storageMonthly = totalStorage * 1000 * 0.021;
      const totalCost = Math.round(computeMonthly + storageMonthly);

      container.querySelector('#statNodes').textContent = `${nodes}`;
      container.querySelector('#statRAM').textContent = `${ram} GB`;
      container.querySelector('#statStorage').textContent = `${totalStorage} TB`;
      container.querySelector('#statCost').textContent = `$${totalCost.toLocaleString()} / mo`;
    }

    sliderVol.addEventListener('input', calculate);
    sliderGrowth.addEventListener('input', calculate);
    sliderRepl.addEventListener('input', calculate);
    sliderJobs.addEventListener('input', calculate);

    calculate();
  }

  // Initialize Medallion Architecture Layer Inspector
  function initMedallionInspector() {
    const container = document.getElementById('medallionInspectorWidget');
    if (!container) return;

    container.innerHTML = `
      <div class="interactive-widget-box">
        <div class="widget-header">
          <div class="widget-title">
            <span>🏛️</span> Medallion Architecture (Bronze ➔ Silver ➔ Gold) Inspector
          </div>
          <span class="widget-badge">Data Refinement Pipeline</span>
        </div>
        <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 1rem;">
          Click through the progressive curation layers to inspect transformations, schema enforcement, and quality gates.
        </p>
        <div class="medallion-container">
          <div class="medallion-layer bronze">
            <h4 style="color: #cd7f32;">🥉 Bronze Layer (Raw Ingestion)</h4>
            <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 0.6rem;">Append-only raw events with source payload & timestamp metadata.</p>
            <pre style="font-size: 0.75rem; padding: 0.6rem;"><code>{
  "raw_id": "99401",
  "payload": "user:11,ts:172348,amt:42.5",
  "_ingest_ts": "2026-08-18T14:30:00Z"
}</code></pre>
          </div>
          <div class="medallion-layer silver">
            <h4 style="color: #cbd5e1;">🥈 Silver Layer (Cleaned & Conformed)</h4>
            <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 0.6rem;">Parsed columns, schema enforcement, deduplication & null rejection.</p>
            <pre style="font-size: 0.75rem; padding: 0.6rem;"><code>{
  "user_id": 11,
  "transaction_ts": "2026-08-18T14:30:00Z",
  "amount_usd": 42.50,
  "is_valid": true
}</code></pre>
          </div>
          <div class="medallion-layer gold">
            <h4 style="color: #ffd700;">🥇 Gold Layer (Aggregated Business Data)</h4>
            <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 0.6rem;">Star-schema dimensional aggregates optimized for BI & dashboards.</p>
            <pre style="font-size: 0.75rem; padding: 0.6rem;"><code>{
  "user_id": 11,
  "lifetime_order_count": 14,
  "total_revenue_usd": 842.10,
  "customer_segment": "HIGH_VALUE"
}</code></pre>
          </div>
        </div>
      </div>
    `;
  }

  // Orchestrator
  document.addEventListener('DOMContentLoaded', () => {
    initSQLPlayground();
    initClusterCalculator();
    initMedallionInspector();
  });

})();
