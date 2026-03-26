function App() {
  return (
    <main className="app-shell">
      <section className="hero-panel">
        <p className="eyebrow">Phase 1</p>
        <h1>流浪狗狗领养服务</h1>
        <p className="lead">
          当前项目已完成前端初始化规划，本阶段仅交付文档约定与 mock
          数据产出，等待数据确认后再进入页面开发。
        </p>
        <div className="status-grid">
          <article>
            <span>技术栈</span>
            <strong>React + Vite + TypeScript</strong>
          </article>
          <article>
            <span>数据位置</span>
            <strong>src/public/data</strong>
          </article>
          <article>
            <span>当前状态</span>
            <strong>待确认数据后进入 UI</strong>
          </article>
        </div>
      </section>
    </main>
  );
}

export default App;

