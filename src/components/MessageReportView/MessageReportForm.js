export const messageReportForm = {
  name: 'report',
  tag: 'div',
  children: [
    {
      tag: 'div',
      className: 'form',
      children: [
        {
          tag: 'header',
          className: 'header',
          children: [
            {
              tag: 'h2',
              className: 'title',
              isAccess: 'title',
            },
            {
              tag: 'p',
              className: 'description',
              isAccess: 'message',
            },
          ],
        },
        {
          tag: 'div',
          children: [
            {
              tag: 'button',
              type: 'button',
              classAdd: 'login-btn,btn,waves-effect,waves-light,col,s3',
              innerText: 'Ок',
              isAccess: 'ok',
            },
            {
              tag: 'button',
              type: 'button',
              className: 'button',
              classAdd: 'cancel-btn,btn,waves-effect,waves-light,teal,lighten-2,col,s3',
              innerText: 'Отменить',
              isAccess: 'cancel',
            },
          ],
        },
      ],
    },
  ],
};
