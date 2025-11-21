// 文件2：_worker.js（必须放在项目根目录，文件名就是 _worker.js）
export default {
  async fetch(request, env, ctx) {
    // 把 KV 注入到页面中
    const url = new URL(request.url);
    if (url.pathname === '/') {
      let html = await fetch('https://' + url.host + '/index.html').then(r => r.text());
      html = html.replace(
        'const KV_NAMESPACE = MY_KV;',
        `const KV_NAMESPACE = ${JSON.stringify(env.MY_KV)};`
      );
      return new Response(html, {
        headers: { 'Content-Type': 'text/html;charset=UTF-8' }
      });
    }
    return fetch(request);
  }
};
