import { BasedAppFunction } from '@based/functions';

        const app: BasedAppFunction = async (_based, { css, js, favicon }) => {
          return '<!DOCTYPE html>' +
            '<html lang="en">' +
              '<head>' +
                '<meta charset="utf-8" />' +
                '<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0, viewport-fit=cover" />' +
                '<meta name="title" content="Playground" />' +
                '<title>Playground</title>' +
                '<link rel="icon" type="image/x-icon" href="' + favicon.url + '" />' +
                '<style>' +
                  (await css.text) +
                '</style>' +
              '</head>' +
              '<body style="margin: 0;">' +
                '<div id="root"></div>' +
                '<script>' +
                  (await js.text) +
                '</script>' +
              '</body>' +
            '</html>';
        };
        
        export default app;
        