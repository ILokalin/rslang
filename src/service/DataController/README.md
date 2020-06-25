## DataController

### getWords

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

## getUser

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

## setUserOptions

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

## logOut

**I recommend not to use in games. Maybe for test only**

Logout user from App and remove token from localStorage. The next call `getUser` shall open the window for authorization.

## DataController

add customization of user words and promise for get materials

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
  status
}
```
- id - wordId
- status - custom status... 'hard', 'easy', etc.


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
  status
}
```
- id - wordId
- status - custom status... 'hard', 'easy', etc.

**real sample option**
```
{
  id: '5e9f5ee35eb9e72bc21af6f8',
  status: 'hard',
}
```


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
Get array all user words. Exampl:
```
import { dataController } from 'Service/DataController';

const dataController = new DataController();

dataController.userWordsGetAll()
  .then(
    (response) => {... success},
    (rejectReport) => {.. reject}
  )
```
- response - contains array of words:
  - wordId - id of word as card
  - id - record id
  - difficulty - custom status
  - optional.date - date of create/update

**sample**
```
[
  {
    "id": "5ef39ffd5b1916001741287d",
    "difficulty": "hard",
    "optional": {
      "lastDate": "Thu Jun 25 2020"
    },
    "wordId": "5e9f5ee35eb9e72bc21af6f8"
  },
  {
    "id": "5ef3d0a95b19160017412b69",
    "difficulty": "hard",
    "optional": {
      "lastDate": "Thu Jun 25 2020"
    },
    "wordId": "5e9f5ee35eb9e72bc21af6fa"
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
*** next version - preload material