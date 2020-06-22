## DataController

### getWords

```
import { DataController } from 'Service/DataController';

const dataController = new DataController;

dataController.getWords(options)
  .then(
    (wordsArray) => {...},
    (rejectReport) => {...обработка ошибки}
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
- group:number - номер группы от 0 до 5
- page:number  - номер страницы от 0 до 29 
- wordsPerExampleSentenceLTE: - **doesn't work**
- wordsPerPage: **doesn't work**

default options {page: 0, group: 0}

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

## logOut

**I recommend not to use in games. Maybe for test only**

Logout user from App and remove token from localStorage. The next call `getUser` shall open the window for authorization.
