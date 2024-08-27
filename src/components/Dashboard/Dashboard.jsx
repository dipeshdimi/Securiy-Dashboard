import { useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale } from 'chart.js';
import initialData from '../../data';
import './Dashboard.css';
import AddWidgetPopup from '../AddWidgetPopup/AddWidgetPopup';

ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale);

function Dashboard() {
  const [data, setData] = useState(initialData);
  const [showPopup, setShowPopup] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);

  const handleAddWidget = (categoryId, newWidget) => {
    setData(prevData =>
      prevData.map(category =>
        category.id === categoryId
          ? {
            ...category,
            widgets: [
              ...category.widgets,
              { id: Date.now(), ...newWidget },
            ],
          }
          : category
      )
    );
  };

  const handleRemoveWidget = (categoryId, widgetId) => {
    setData(prevData =>
      prevData.map(category =>
        category.id === categoryId
          ? {
            ...category,
            widgets: category.widgets.filter(widget => widget.id !== widgetId),
          }
          : category
      )
    );
  };

  const renderWidgetContent = (widget, chartType) => {
    if (widget.imageUrl && widget.textContent) { // CWPP Dashboard
      return (
        <div className='cwpp'>
          <img src={widget.imageUrl} alt="Widget Image" />
          <p>{widget.textContent}</p>
        </div>
      );
    }

    if (widget.chartData) {
      const chartOptions = {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return `${tooltipItem.label}: ${tooltipItem.raw}`;
              },
            },
          },
        },
        scales: {
          x: {
            stacked: true,
            beginAtZero: true,
            grid: {
              display: false, // Remove x-axis grid lines
            },
            ticks: {
              display: false, // Hide x-axis labels
            },
          },
          y: {
            stacked: true,
            display: false, // Hide y-axis labels
            grid: {
              display: false, // Remove y-axis grid lines
            },
            ticks: {
              display: false, // Hide y-axis labels
            },
          },
        },
      };

      switch (chartType) {
        case 'Donut Chart':
          return (
            <div className='pie-chart-container'>
              <Pie
                data={{
                  labels: widget.labels,
                  datasets: [
                    {
                      label: widget.name,
                      data: widget.chartData,
                      backgroundColor: widget.labels.map((_, index) => `hsl(${index * 360 / widget.labels.length}, 80%, 60%)`),
                      borderColor: '#fff',
                      borderWidth: 1,
                    },
                  ],
                }}
                options={chartOptions}
              />
            </div>
          );
        case 'Horizontal Stacked Chart':
          return (
            <div className='bar-chart-container'>
              <Bar
                data={{
                  labels: [''], // Empty label since we only want one bar
                  datasets: widget.labels.map((label, index) => ({
                    label,
                    data: [widget.chartData[index]],
                    backgroundColor: `hsl(${index * 360 / widget.labels.length}, 80%, 50%)`,
                    barThickness: 10, // Thin bars to resemble a line
                  })),
                }}
                options={{
                  ...chartOptions,
                  indexAxis: 'y', // Horizontal bar
                  plugins: {
                    ...chartOptions.plugins,
                    legend: {
                      display: false, // Hide the legend for bar chart
                    },
                  },
                  scales: {
                    x: {
                      ...chartOptions.scales.x,
                      grid: {
                        display: false, // Remove x-axis grid lines
                      },
                      ticks: {
                        display: false, // Hide x-axis labels
                      },
                    },
                    y: {
                      ...chartOptions.scales.y,
                      grid: {
                        display: false, // Remove y-axis grid lines
                      },
                      ticks: {
                        display: true, // Show y-axis labels
                      },
                    },
                  },
                }}
              />
            </div>
          );
        default:
          return <p>No chart available for this type: {chartType}</p>;
      }
    }

    return (
      <div className='cwpp'>
        <img src="/no-graph.jpg" alt="No Graph" />
        <p>No graph data available!</p>
      </div>
    );
  };

  return (
    <div className="dashboard">
      {data.map(category => (
        <div key={category.id} className="category">
          <div className="widgets">
            {category.widgets.map(widget => (
              <div key={widget.id} className="widget">
                <div className="widget-header">
                  <h3>{widget.name}</h3>
                  <button onClick={() => handleRemoveWidget(category.id, widget.id)}>×</button>
                </div>
                <div className={category.chartType === 'Donut Chart' ? 'pie-legend-container' : 'bar-legend-container'}>
                  {renderWidgetContent(widget, category.chartType)}
                  {category.chartType === 'Donut Chart' && (
                    <div className="pie-chart-legend">
                      {widget.labels.map((label, index) => (
                        <div key={index} className="pie-chart-legend-item">
                          <div
                            className="legend-color-box"
                            style={{ backgroundColor: `hsl(${index * 360 / widget.labels.length}, 80%, 60%)` }}
                          />
                          <span>{label}: {widget.chartData[index]}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {category.chartType === 'Horizontal Stacked Chart' && (
                    <div className="bar-chart-legend">
                      {widget.labels.map((label, index) => (
                        <div key={index} className="bar-chart-legend-item">
                          <div
                            className="legend-color-box"
                            style={{ backgroundColor: `hsl(${index * 360 / widget.labels.length}, 80%, 50%)` }}
                          />
                          <span>{label}: {widget.chartData[index]}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div className='widget'>
              <button
                className="add-widget"
                onClick={() => { setShowPopup(true); setCurrentCategory(category.id); }}
              >
                + Add Widget
              </button>
            </div>
          </div>
        </div>
      ))}
      {showPopup && (
        <AddWidgetPopup
          currentCategory={currentCategory}
          onAddWidget={handleAddWidget}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
}

export default Dashboard;
