## DataController

### getWordMaterials

Implementation for the method of get words materials. Example of use:

```
const imageMaterial = new Img();
audio = new Audio();
audioExample = new Audio();
audioMeaning = new Audio();

dataController.getWordMaterials('5e9f5ee35eb9e72bc21af4a0')
  .then((materialOfCard) => {
    imageMaterial.src = materialOfCard.image;
    audio.src = materialOfCard.audio;
    audioExample.src = materialOfCard.audioExample;
    audioMeaning.src = materals.audioMeaning;
  });
```

The image and sounds is ready to attach and already have specified parameters for base64. All fields of word card returned also.

**sample of materialOfCard**

```
    {
      id: '5e9f5ee35eb9e72bc21af4a0',
      group: 0,
      page: 0,
      word: 'alcohol',
      image: 'data:image/jpg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT
...
AEkkkgBJJJIASSSSAEkkkgBJJJIASSSSAEkkkgBKQPdlOqSShgJ+trqNJJSAkkkkAJJJJACSSSQAkkkkAJJJJACSSSQB//2Q==',
      audio: 'data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjE3LjEwMQAAAAAAAAAAAAAA//OAYAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAAxAAATZgAICAwMDQ0PDxAQEhITExcXHh4oKDIyPDxFRU5OWFhdXWNjbm54eH19g4OJiY6
...
ABpAAAAAAAAANIAAAAAKqqqqqq//MQYDMAAAGkAAAAAAAAA0gAAAAAqqqqqqr/8xBgOAAAAaQAAAAAAAADSAAAAACqqqqqqg==',
      audioMeaning: 'data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjE3LjEwMQAAAAAAAAAAAAAA//OAYAAAAAAAAAAA
...
gAAAAAqqqqqqr/8xBgJgAAAaQAAAAAAAADSAAAAACqqqqqqv/zEGArAAABpAAAAAAAAANIAAAAAKqqqqqq//MQYDAAAAGkAAAAAAAAA0gAAAAAqqqqqqo=',
      audioExample: 'data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjE3LjEwMQAAAAAAAAAAAAAA//OAYAAAAAAAAAAA
...
AAAAAAA0gAAAAAVVVVVVX/8xBgLAAAAaQAAAAAAAADSAAAAABVVVVVVf/zEGAxAAABpAAAAAAAAANIAAAAAFVVVVVV',
      textMeaning: '<i>Alcohol</i> is a type of drink that can make people drunk.',
      textExample: 'A person should not drive a car after he or she has been drinking <b>alcohol</b>.',
      transcription: '[ǽlkəhɔ̀ːl]',
      textExampleTranslate: 'Человек не должен водить машину после того, как он выпил алкоголь',
      textMeaningTranslate: 'Алкоголь - это тип напитка, который может сделать людей пьяными',
      wordTranslate: 'алкоголь',
      wordsPerExampleSentence: 15
    }
```

### getUserStatistics

Returns full statistics for every single game.
Statistics for each game contains fields `longTime` and `top`. Exampl:

```
import { DataController } from 'Service/DataController';

const dataController = new DataController;

dataController.userStatisticGet()
  .then(
    (statistics) => {...},
    (rejectReport) => {...Bad request}
  )
```

**statistics**

- learnedWords - learned words at all period
- gameName - fields of games name: 'savanna', 'card', etc.
  - longTime - array of object `{result, date}`. Index 0 contains the oldest record.
  - top - array of top 5 results. Index 0 contains the best result.

**real sample statistics**

```
{
  savanna: {
    longTime: [
      {result: 70, date: 'Thu Jul 02 2020'},
      {result: 100, date: 'Thu Jul 02 2020'}
    ],
    top: [
      {result: 100, date: 'Thu Jul 02 2020'},
      {result: 70, date: 'Thu Jul 02 2020'},
    ]
  },
  card: {
    longTime: [
      {result: 70, learnedWords: 25, date: 'Thu Jul 02 2020'},
      {result: 100, learnedWords: 27, date: 'Thu Jul 02 2020'}
    ],
    top: [
      {result: 100, learnedWords: 27, date: 'Thu Jul 02 2020'},
      {result: 70, learnedWords: 25, date: 'Thu Jul 02 2020'},
    ]
  },
  learnedWords: 52
}
```

### setUserStatistics

Writes the result of game to statistics.

```
import { DataController } from 'Service/DataController';

const dataController = new DataController;

dataController.setUserStatistics(options)
  .then(
    (statisticsAnswer) => {...},
    (rejectReport) => {...Bad request}
  )
```

**options**

- gameName - field named as game ('savanna', 'card', etc)
  - result - result of game - percent usually or best sequence for card game
  - learnedWords - now for `card` only

date of record attached automatically
Top 5 checked and sort automatically (fields `result`)

**real sample of option**

```
{
  savanna: {result: 60}
}
```

**statisticsAnswer**
results of records - see above at `getUserStatistics`
This possibility take top 5 when saved current result game.

### getWords

Get words from group and page

```
import { DataController } from 'Service/DataController';

const dataController = new DataController;

dataController.getWords(options)
  .then(
    (wordsArray) => {...},
    (rejectReport) => {...Bad request}
  )
```

**options**

```
{
  group,
  page,
  wordsPerExampleSentenceLTE,
  wordsPerPage
}
```

- group:number - number of group from 0 to 5. Default: 0
- page:number - number of page from 0 to 29. Default: 0
- wordsPerExampleSentenceLTE: - maximum quntity words per sentence in example. Need fo game Puzzle. Default: 100
- wordsPerPage: Words per page. Checked for 10, 100, 400, 800 words... Default: doesn't used

**rejectReport**

```
{
  status: status from server,
  message: error message from server
}
```

status 400 - 'Bad Request'

WARN: for bad page/group range, `getWords` returned an empty array and status 200 'Ok'!

### getUser

Returns a Promise.
Resolve - user login and have iser settings.
Reject - user canceled login form

```
import { DataController } from 'Service/DataController';

const dataController = new DataController;

dataController.getUser()
  .then(
    (userSettings) => {...},
    (rejectReport) => {...}
  )
```

**userSettings**

```
{
  name: name of user
  ...custom fields later
}
```

**rejectReport**

```
{
  status: 0,
  message: 'User refused',
  name: 'Unknown'
}
```

### setUserOptions

The method for saving users settings (**NOT STATISTIC!**) data. If token expired - open login form. Example:

```
import { DataController } from 'Service/DataController';

const dataController = new DataController();
dataController.setUserOptions(userSettings)
  .then(
    (userSettings) => {...resolves with saved data},
    (rejectReport) => {...user canceled authorization}
  )
```

**userSettings** - object with fields:

```
{
  name,
  settings
  ...
}
```

- name - user name
- settings - **_Reserved_** for card game options
- ... - **here use names of your game for options**

**Important! User for this data format:**
email: 'checker@mail.ru',
password: 'checkerCH#2',

### logOut

**I recommend not to use in games. Maybe for test only**

Logout user from App and remove token from localStorage. The next call `getUser` shall open the window for authorization.

### userWordsPost

Create new record for user word with current date. Exampl for use:

```
import { dataController } from 'Service/DataController';

const dataController = new DataController();

dataController.userWordsPost(option)
  .then(
    () => {... success},
    (rejectReport) => {.. reject}
  )
```

**option**

```
{
  id,
  status, (default 'onlearn')
  progress (default 0)
}
```

- id - wordId
- status - (default 'onlearn') - custom status... 'hard', 'onlearn' or 'deleted'.
- progress - (default 0) - coefficient of learning process
  **Use default!**

### userWordPut

Update exists record for user word. Exampl for use:

```
import { dataController } from 'Service/DataController';

const dataController = new DataController();

dataController.userWordsPut(option)
  .then(
    () => {... success},
    (rejectReport) => {.. reject}
  )
```

**option**

```
{
  id,
  status, (default 'onlearn')
  progress (default 0)
}
```

- id - wordId
- status - (default 'onlearn') - custom status... 'hard', 'onlearn' or 'deleted'.
- progress - (default 0) - coefficient of learning process
  **Use default!**

**real sample option**

```
{
  id: '5e9f5ee35eb9e72bc21af6f8',
  status: 'hard',
}
```

write with status 'hard' and progress 0

```
{
  id: '5e9f5ee35eb9e72bc21af6f8',
}
```

write with status 'onlearn' and progress 0

```
{
  id: '5e9f5ee35eb9e72bc21af6f8',
  status: 'hard',
  progress: 0.5,
}
```

write with status 'hard' and progress 0.5

### userWordsGet

Get specific word on id. Exampl:

```
import { dataController } from 'Service/DataController';

const dataController = new DataController();

dataController.userWordsPut(wordId)
  .then(
    (response) => {... success},
    (rejectReport) => {.. reject}
  )
```

- wordId - word id from card

- response - contains object:
  - difficulty -status
  - optional.date - date of create or update

**sample**

```
{
  "id": "5ef39ffd5b1916001741287d",
  "difficulty": "hard",
  "optional": {
    "lastDate": "Thu Jun 25 2020"
  },
  "wordId": "5e9f5ee35eb9e72bc21af6f8"
}
```

### userWordsGetAll

Get array all user words aggregated by 'or'. Exampl:

```
import { dataController } from 'Service/DataController';

const dataController = new DataController();

dataController.userWordsGetAll(options)
  .then(
    (response) => {... success},
    (rejectReport) => {.. reject}
  )
```

- optional - array with selectors for aggregate by "or". Example:

```
dataController.userWordsGetAll(['hard', 'onlearn']);
```

selects all words with difficulty field equal 'hard' or 'onlearn'.

```
dataController.userWordsGetAll(['deleted']);
```

selects list with deleted words.

- response - contains array of words:

  - paginatedResults - aggregated array of user words
  - totalCount.count - count of all user words

- every word have
  - difficulty - custom status
  - optional.lastDate - date of create/update
  - progress - coefficient of learning process

**sample**

```
[
  {
    "paginatedResults": [
      {
        "_id": "5e9f5ee35eb9e72bc21af4a4",
        "group": 0,
        "page": 0,
        "word": "August",
        ... ---full scheme see below---
        "userWord": {
          "difficulty": "onlearn",
          "optional": {
            "lastDate": "Sat Jun 27 2020",
            "progress": 0.5
          }
        }
      },
      {
        "_id": "5e9f5ee35eb9e72bc21af6f8",
        "group": 1,
        "page": 0,
        "word": "because",
        ... ---full scheme see below---
        "userWord": {
          "difficulty": "hard",
          "optional": {
            "lastDate": "Sat Jun 27 2020",
            "progress": 0.5
          }
        }
      },
      {
        "_id": "5e9f5ee35eb9e72bc21af6fa",
        "group": 1,
        "page": 0,
        "word": "expensive",
        ... ---full scheme see below---
        "userWord": {
          "difficulty": "hard",
          "optional": {
            "lastDate": "Sat Jun 27 2020",
            "progress": 0.5
          }
        }
      }
    ],
    "totalCount": [
      {
        "count": 3
      }
    ]
  }
]
```

### getMaterials

Returned full path for materails.

```
const file = file/sound111.mp3

getMaterials(file)
  .then(
    (fullPath) => {

    }
  )
```

- fullPath - full path as `https://raw.githubusercontent.com/ilokalin/rslang-data/master/file/sound111.mp3`
  \*\*\* next version - preload material

### Append

full scheme from **userWordsGetAll**

```
[
  {
    "paginatedResults": [
      {
        "_id": "5e9f5ee35eb9e72bc21af4a4",
        "group": 0,
        "page": 0,
        "word": "August",
        "image": "files/01_0004.jpg",
        "audio": "files/01_0004.mp3",
        "audioMeaning": "files/01_0004_meaning.mp3",
        "audioExample": "files/01_0004_example.mp3",
        "textMeaning": "<i>August</i> is the eighth month of the year.",
        "textExample": "Is your birthday in <b>August</b>?",
        "transcription": "[ɔ́ːgəst]",
        "textExampleTranslate": "У тебя день рождения в августе?",
        "textMeaningTranslate": "Август - восьмой месяц года",
        "wordTranslate": "август",
        "wordsPerExampleSentence": 5,
        "userWord": {
          "difficulty": "onlearn",
          "optional": {
            "lastDate": "Sat Jun 27 2020",
            "progress": 0.5
          }
        }
      },
      {
        "_id": "5e9f5ee35eb9e72bc21af6f8",
        "group": 1,
        "page": 0,
        "word": "because",
        "image": "files/01_0601.jpg",
        "audio": "files/01_0601.mp3",
        "audioMeaning": "files/01_0601_meaning.mp3",
        "audioExample": "files/01_0601_example.mp3",
        "textMeaning": "<i>Because</i> introduces a reason for something.",
        "textExample": "We need to study <b>because</b> we have a test tomorrow.",
        "transcription": "[bikɔ́ːz]",
        "textExampleTranslate": "Нам нужно учиться, потому что завтра у нас тест",
        "textMeaningTranslate": "Потому что вводит причину чего-то",
        "wordTranslate": "потому что",
        "wordsPerExampleSentence": 10,
        "userWord": {
          "difficulty": "hard",
          "optional": {
            "lastDate": "Sat Jun 27 2020",
            "progress": 0.5
          }
        }
      },
      {
        "_id": "5e9f5ee35eb9e72bc21af6fa",
        "group": 1,
        "page": 0,
        "word": "expensive",
        "image": "files/01_0603.jpg",
        "audio": "files/01_0603.mp3",
        "audioMeaning": "files/01_0603_meaning.mp3",
        "audioExample": "files/01_0603_example.mp3",
        "textMeaning": "<i>Expensive</i> things cost a lot of money.",
        "textExample": "My friend drives an <b>expensive</b> sports car.",
        "transcription": "[ikspénsiv]",
        "textExampleTranslate": "Мой друг водит дорогой спортивный автомобиль",
        "textMeaningTranslate": "Дорогие вещи стоят больших денег",
        "wordTranslate": "дорогой",
        "wordsPerExampleSentence": 7,
        "userWord": {
          "difficulty": "hard",
          "optional": {
            "lastDate": "Sat Jun 27 2020",
            "progress": 0.5
          }
        }
      }
    ],
    "totalCount": [
      {
        "count": 3
      }
    ]
  }
]
```
