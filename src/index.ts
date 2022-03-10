import vm from 'vm';
import jsdom from 'jsdom';


interface IGlobalThis {
  xtableSsrContext: { result: { body: HTMLElement } };
}


// @ts-ignore
global.globalThis = global;

export default async function (padId: string, sheetId: string, data: any[][][], plat = 'pc', viewId: string) {
  const xtableSsrContext = {
    result: {
      body: null as unknown as HTMLElement,
    },
  };
  const jsdomInstance = new jsdom.JSDOM(
    `<!DOCTYPE html>
      <style>
        html, body { width: 2000px; height: 1000px; }
        * { margin: 0; padding: 0}
      </style>
      <body></body>
    </html>`,
    {
      url: 'https://docs.qq.com/',
      runScripts: 'dangerously',
      resources: 'usable',
      beforeParse: (window) => {
        const global = window as unknown as IGlobalThis;
        global.xtableSsrContext = xtableSsrContext;
      },
    }
  );
  try {
    const script = new vm.Script('console.log(1111)');
    script.runInContext(jsdomInstance.getInternalVMContext(), { timeout: 3000 });
  } catch (err) {
    console.log('error', err);
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(null);
    }, 3000);
  });
}
