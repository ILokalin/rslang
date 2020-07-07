## PreloaderController

Combining component for PreloaderView and AppState. Showing preloader screen with text, ich friendly say current position for loading process. Basic time for one phrase equals 5s. When you stopping preloader is time for one phrase to set smaller and equals .5s and all set showed very quickly.
Minimal time for the screen show is 8s

**Why controller?** You have to one component for import and use two methods only: `show` and `hide` preloader.

### showPreloader

strart to show preloader screen. Use before start words loader from DataController

### hidePreloader

Before stop showing, preloader quickly show all phrases and then remove preloader screen

**Example for async**

```
  import { DataController } from 'Service/DataController';
  import { PreloaderController } from 'Service/PreloaderController';

  preloaderController.showPreloader();
  dataController
    .getWords({
      group: 1,
      page: (wordPagesCount += 1),
      wordsPerExampleSentenceLTE,
      wordsPerPage,
    })
    .then(
      (words) => {
        preloaderController.hidePreloader();
        // Your function for received words here...
      },
      (rejectReport) => {
        reportLine.innerText = rejectReport.message;
      },
    );
```
