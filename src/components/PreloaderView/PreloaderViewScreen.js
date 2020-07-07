export const preloaderViewScreen = {
  name: 'preloader',
  tag: 'div',
  children: [
    {
      tag: 'div',
      className: 'content',
      children: [
        {
          tag: 'div',
          className: 'animation',
          children: [
            {
              tag: 'div',
              className: 'square',
              innerHTML: '<span></span><span></span><span></span>',
            },
            {
              tag: 'div',
              className: 'square',
              innerHTML: '<span></span><span></span><span></span>',
            },
            {
              tag: 'div',
              className: 'square',
              innerHTML: '<span></span><span></span><span></span>',
            },
            {
              tag: 'div',
              className: 'square',
              innerHTML: '<span></span><span></span><span></span>',
            },
          ],
        },
        {
          tag: 'header',
          className: 'header',
          children: [
            {
              tag: 'p',
              className: 'discribe',
              isAccess: 'discribeLine',
            },
          ],
        },
      ],
    },
  ],
};
