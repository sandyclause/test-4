import React from 'react';
import { Bar, Pie, HorizontalBar} from 'react-chartjs-2';
import PropTypes from "prop-types";

class Chart extends React.Component {

  render() {
    return (
      <div className="chart">
        <Bar
          data={this.props.personalCreditDebit}

          options={{
            responsive: true,
            legend: {
              display: false,
              position: "top"
            },
            title: {
              display: true,
              text: "Personal Credit and Debit"
            },
            maintainAspectRatio: false,
            hover: {
              mode: "nearest",
              intersect: true
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true
                  }
                }
              ]
            },
            tooltips: {
              callbacks: {
                label: (tooltipItems, data) => {
                  return `$${tooltipItems.yLabel}`;
                }
              }
            }
          }}
        />
        <Bar
          data={this.props.creditDebitData}
          options={{
            responsive: true,
            legend: {
              display: false,
              position: "top"
            },
            title: {
              display: true,
              text: "Credits vs Debits"
            },
            maintainAspectRatio: false,
            hover: {
              mode: "nearest",
              intersect: true
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true
                  }
                }
              ]
            },
            tooltips: {
              callbacks: {
                label: (tooltipItems, data) => {
                  return `$${tooltipItems.yLabel}`;
                }
              }
            }
          }}
        />
        <Pie
          data={this.props.maleFemaleData}
          options={{
            responsive: true,
            title: {
              display: true,
              text: "Male vs Female Numbers"
            },
            maintainAspectRatio: false,
            hover: {
              mode: "nearest",
              intersect: true
            }
          }}
        />
        <HorizontalBar
          data={this.props.maleFemaleDebitData}
          options={{
            responsive: true,
            legend: {
              display: false,
              position: "top"
            },
            title: {
              display: true,
              text: "Debits By Gender"
            },
            maintainAspectRatio: false,
            hover: {
              mode: "nearest",
              intersect: true
            },
            scales: {
              xAxes: [
                {
                  ticks: {
                    beginAtZero: true
                  }
                }
              ]
            },
            tooltips: {
              callbacks: {
                label: (tooltipItems, data) => {
                  return `$${tooltipItems.xLabel}`;
                }
              }
            }
          }}
        />
        <Bar
          data={this.props.maleFemaleCreditData}s
          options={{
            responsive: true,
            legend: {
              display: false,
              position: "top"
            },
            title: {
              display: true,
              text: "Credits By Gender"
            },
            maintainAspectRatio: false,
            hover: {
              mode: "nearest",
              intersect: true
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true
                  }
                }
              ]
            },
            tooltips: {
              callbacks: {
                label: (tooltipItems, data) => {
                  return `$${tooltipItems.yLabel}`;
                }
              }
            }
          }}
        />
        
      </div>
    );
  }
}

Chart.propTypes = {
  creditDebitData: PropTypes.object,
  maleFemaleData: PropTypes.object,
  maleFemaleDebitData: PropTypes.object,
  maleFemaleCreditData: PropTypes.object,
  personalInfo: PropTypes.object
}

export default Chart;