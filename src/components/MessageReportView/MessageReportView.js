import { DomGen } from 'Service/DomGen';
import { messageReportState, answerFromMessageReport } from 'Service/AppState';
import { messageReportForm } from './MessageReportForm';

export class MessageReportView {
  constructor() {
    this.body = document.body;
    this.currentVisibleState = false;
    this.answerOk = this.answerOk.bind(this);
    this.answerCancel = this.answerCancel.bind(this);
  }

  init() {
    this.report = DomGen(messageReportForm);
    this.report.ok.addEventListener('click', this.answerOk);
    this.report.cancel.addEventListener('click', this.answerCancel);

    messageReportState.watch((reportState) => {
      const {
        isVisible = this.currentVisibleState,
        okCallback,
        cancelCallback,
        ...header
      } = reportState;

      Object.keys(header).forEach((key) => {
        // eslint-disable-next-line no-prototype-builtins
        if (this.report.hasOwnProperty(key)) {
          this.report[key].innerText = header[key];
        }
      });

      if (isVisible && !this.currentVisibleState) {
        const { ok, cancel } = this.report;
        const buttonVisible = (button, isCallback) => {
          if (isCallback) {
            // eslint-disable-next-line no-param-reassign
            button.style.display = 'block';
          } else {
            // eslint-disable-next-line no-param-reassign
            button.style.display = 'none';
          }
        };

        buttonVisible(ok, okCallback);
        buttonVisible(cancel, cancelCallback);

        this.okCallback = okCallback;
        this.cancelCallback = cancelCallback;

        this.openReport();
      } else if (!isVisible && this.currentVisibleState) {
        this.closeReport();
      }
    });
  }

  openReport() {
    this.body.append(this.report.block);
  }

  closeReport() {
    this.report.block.remove();
  }

  answerOk() {
    answerFromMessageReport(this.okCallback);
  }

  answerCancel() {
    answerFromMessageReport(this.cancelCallback);
  }
}
