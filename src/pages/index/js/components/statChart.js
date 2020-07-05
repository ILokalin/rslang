/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import Chart from 'chart.js';

const getDummyData = (fullStatisticsObject) => {
  const { longTime } = fullStatisticsObject.card;
  console.log(longTime);
  const dummyData = ['0'].concat(longTime.map((item) => item[1]));
  console.log(dummyData);
  return dummyData
}

const getLabels = (fullStatisticsObject) => {
  const { longTime } = fullStatisticsObject.card;
  console.log(longTime);
  const labels = [''].concat(longTime.map((item) => item[0]));
  console.log(labels);
  return labels;
}

export const renderStatChart = (fullStatisticsObject) => {
  const canvas = document.getElementById('chart');
  const ctx    = canvas.getContext('2d');
  const grad   = ctx.createLinearGradient(0, 0, 0, window.innerHeight);

  // Create a background gradient.
  grad.addColorStop(0, '#4db6ac')
  grad.addColorStop(.9, '#fff')
  grad.addColorStop(1, '#fff')

  // Create a shadow line.
  const shadowLine = Chart.controllers.line.extend({
      initialize () {
      // eslint-disable-next-line prefer-rest-params
      Chart.controllers.line.prototype.initialize.apply(this, arguments)

        // eslint-disable-next-line no-shadow
        const {ctx} = this.chart
        const originalStroke = ctx.stroke
        ctx.stroke = function () {
          ctx.save()
          ctx.shadowColor = '#1a1426'
          ctx.shadowOffsetY = 5
          ctx.shadowBlur = 15
          // eslint-disable-next-line prefer-rest-params
          originalStroke.apply(this, arguments)
          ctx.restore()
        }
      }
  })
  Chart.controllers.shadowLine = shadowLine

  const dummyData = getDummyData(fullStatisticsObject);
  
  // eslint-disable-next-line no-unused-vars
  const chart = new Chart(ctx, {
    type: 'shadowLine',
    data: {
      labels: getLabels(fullStatisticsObject),
      datasets: [{
        label: '',
        backgroundColor: grad,
        borderColor: '#26a69a',
        bezierCurve: true,
        pointBackgroundColor: 'rgba(255, 255, 255, 1)',
        pointBorderColor: 'rgba(255, 255, 255, 1)',
        pointRadius: 7,
        pointHoverRadius: 7,
        data: dummyData,
      }]
    },
    options: {
      title: {
        display: false
      },
      layout: {
        padding: {
          left: 50
        }
      },
      legend: {
        labels: {
          boxWidth: 0,
          fontColor: 'rgba(255, 255, 255)',
          fontSize: 16,
          padding: 16
        },
      },
      scales: {
        xAxes: [{
          type: 'category',
          gridLines: {
            color: 'rgba(64, 71, 91, 1)',
            borderDash: [5, 2]
          },
          ticks: {
            padding: 16
          }
        }],
        yAxes: [{
          gridLines: {
            color: 'rgba(64, 71, 91, 1)',
            borderDash: [5, 2]
          },
          ticks: {
            min: 0,
            suggestedMax: Math.max.apply(null, dummyData) + 10,

            callback(value) {
                return `${value  }   `
            }
          }
        }]
      },
      // Code mostly copied from http://www.chartjs.org/docs/latest/configuration/tooltip.html#external-custom-tooltips
      tooltips: {
        custom(tooltipModel) {
          const tooltipEl     = document.getElementById('chartjs-tooltip')
          const tooltipElText = tooltipEl.querySelector('#chartjs-tooltip__text')

          // Hide if no tooltip
          if (tooltipModel.opacity === 0) {
            // tooltipEl.style.opacity = 0
            return
          }

          // Set caret Position
          tooltipEl.classList.remove('above', 'below', 'no-transform', 'active')
          if (tooltipModel.yAlign) {
            tooltipEl.classList.add(tooltipModel.yAlign)
          } else {
            tooltipEl.classList.add('no-transform')
          }

          function getBody(bodyItem) {
            return bodyItem.lines
          }

          if (tooltipModel.body) {
            // const titleLines = tooltipModel.title || []
            const bodyLines  = tooltipModel.body.map(getBody)

            // `this` will be the overall tooltip
            // eslint-disable-next-line no-underscore-dangle
            const position = this._chart.canvas.getBoundingClientRect()

            // Display, position, and set styles for font
            tooltipEl.className += ' active'
            tooltipEl.style.top = `${tooltipModel.caretY - 34  }px`
            tooltipEl.style.height = `${position.height - tooltipModel.caretY  }px`
            tooltipElText.style.width = `${tooltipModel.width  }px`
            tooltipEl.style.left = `${position.left + tooltipModel.caretX  }px`
            if (document.documentElement.clientWidth >= 992){
              tooltipEl.style.left = `${position.left + tooltipModel.caretX - 300  }px`  
            }
            
            // Hide original tooltip
            tooltipModel.opacity = 0
            
            // Set text
            tooltipElText.innerHTML = ''
            
            for (let i = 0; i < bodyLines.length; i++) {
              const body = bodyLines[i]
              tooltipElText.innerHTML += `${body } слов изучено`
            }
          }
        }
      }
    }
  })
}