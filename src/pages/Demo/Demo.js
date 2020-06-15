import { DomGen } from 'Service/DomGen';

const PHRASE_TASK = 'Start Task RS Lang';
const PHRASE_SCHOOL = 'RS School 2020q1';

export function Demo(parent) {
  let isFillHeader = false;

  /**
   * Описание BEM блока 
   */
  const pageApp = DomGen({
    name: 'page', tag: 'div', children: [
      {tag: 'header', className: 'header', isAccess: 'header'},
      {tag: 'main', className: 'main', children: [
        {tag: 'button', className: 'button', type: 'button', innerText: "Change Header color", isAccess: 'button'},
      ]},
      {tag: 'footer', className: 'footer', innerText: PHRASE_TASK, isAccess: 'footer'},
    ]
  });

  /**
   * Доступ к выбранным элемнтам и возможность менять модификатор блока
   */
  pageApp.button.addEventListener('click', () => {
    pageApp.toggleMod('fill');
    pageApp.header.innerText = pageApp.footer.innerText;
    pageApp.footer.innerText = isFillHeader ? PHRASE_TASK : PHRASE_SCHOOL;
    isFillHeader = isFillHeader ? false : true;
  })

  // Добавление блока на страницу
  parent.append(pageApp.block);
}
