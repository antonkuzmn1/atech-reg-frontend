import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Dictionaries {
  public static date = {
    month: {
      full: {
        lower: {
          russian: {
            genetive: [
              'января',
              'февраля',
              'марта',
              'апреля',
              'мая',
              'июня',
              'июля',
              'августа',
              'сентября',
              'октября',
              'ноября',
              'декабря',
            ],
            nominative: [
              'январь',
              'февраль',
              'март',
              'апрель',
              'май',
              'июнь',
              'июль',
              'август',
              'сентябрь',
              'октябрь',
              'ноябрь',
              'декабрь',
            ],
          },
        },
        upper: {
          russian: {
            genetive: [
              'Января',
              'Февраля',
              'Марта',
              'Апреля',
              'Мая',
              'Июня',
              'Июля',
              'Августа',
              'Сентября',
              'Октября',
              'Ноября',
              'Декабря',
            ],
            nominative: [
              'Январь',
              'Февраль',
              'Март',
              'Апрель',
              'Май',
              'Июнь',
              'Июль',
              'Август',
              'Сентябрь',
              'Октябрь',
              'Ноябрь',
              'Декабрь',
            ],
          },
        },
      },
    },
  };
  public static path = {
    status: {
      loading: {
        img: 'assets/loading.gif',
        text: 'Загрузка...',
      },
      notFound: {
        img: 'assets/notfound.jpg',
        text: 'Ничего не найдено :(',
      },
    },
  };
}
