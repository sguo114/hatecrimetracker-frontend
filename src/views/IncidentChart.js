import { ThemeColors } from '@src/utility/context/ThemeColors'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'
import { Card, CardBody, CardHeader, CardTitle } from 'reactstrap'
import React, { useEffect, useLayoutEffect, useState, useContext } from 'react'
import { stateFullName } from '../utility/Utils';
import { useTranslation } from 'react-i18next';
import { Trans } from 'react-i18next';
import { th } from 'date-fns/locale'

am4core.useTheme(am4themes_animated)

/*
Example comes from here
https://www.amcharts.com/docs/v4/getting-started/integrations/using-react/
*/

const togDaily = false, togMonthly = false
//chartData is result from ___
const IncidentChartTrial = ({color, chart_data, state, isFirstLoadData}) => {
    const { t } = useTranslation();
    const [totalCases, setTotalCases] = useState(0);
    let toggleDaily = togDaily, toggleMonthly = togMonthly
    // const [toggleDaily, setToggleDaily] = useState(false);
    // const [toggleMonthly, setToggleMonthly] = useState(false)
    
    useLayoutEffect(() => {
        let total = 0
        for(let i = 0; i<chart_data.length; i++){
            total += chart_data[i].value
        }
        setTotalCases(total)

        // Create chart instance
        let chart = am4core.create("charttrial", am4charts.XYChart)
        chart.data = chart_data

        // Create date axes and value axes
        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.stroke = "white";
        dateAxis.renderer.grid.template.strokeWidth = 1; 
        dateAxis.renderer.grid.template.strokeOpacity = .2;
        dateAxis.renderer.grid.template.strokeDasharray = "3,3"
        dateAxis.dateFormats.setKey("day", "M/d/yy");
        dateAxis.periodChangeDateFormats.setKey("day", "M/d/yy");
        dateAxis.dateFormats.setKey("week", "M/d/yy");
        dateAxis.periodChangeDateFormats.setKey("week", "M/d/yy");
        dateAxis.dateFormats.setKey("month", "M/d/yy");
        dateAxis.periodChangeDateFormats.setKey("month", "M/d/yy");
    
        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = "Daily Count";
        valueAxis.min = 0;
        valueAxis.title.fontWeight = 600;
        valueAxis.renderer.grid.template.stroke = "white";
        valueAxis.renderer.grid.template.strokeWidth = 1; 
        valueAxis.renderer.grid.template.strokeOpacity = .2;
        valueAxis.renderer.grid.template.strokeDasharray = "3,3";

        let valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis2.title.text = "Monthly Count";
        valueAxis2.min = 0
        valueAxis2.title.fontWeight = 600;
        valueAxis2.renderer.opposite = true;
        
        // Setting up toolTipText
        let toolTipText = `{key}
        [bold]Monthly Cases: {monthly_cases}
        [bold]Daily Cases: {value}`

        // Create series (the data sets)
        let series1 = chart.series.push(new am4charts.LineSeries());
        series1.dataFields.valueY = "monthly_cases";
        series1.dataFields.dateX = "key";
        series1.name = "Monthly Cases";
        series1.tooltipText = `{key}
        [bold]Monthly Cases: {monthly_cases}`;
        series1.yAxis = valueAxis2;
        series1.fillOpacity = 0.4;

        let series2 = chart.series.push(new am4charts.ColumnSeries());
        series2.dataFields.valueY = "value";
        series2.dataFields.dateX = "key";
        series2.name = "Daily Cases";
        // series2.tooltipText = toolTipText;
        series2.columns.template.tooltipText = `{key}
        [bold]Daily Cases: {value}`;
        chart.tooltip.label.fill = am4core.color("#f00");
        series2.clustered = true;
        series2.fill = am4core.color(color);
        series2.stroke = am4core.color(color);
        series2.columns.template.width = am4core.percent(80);

        
        // chart cursor on 
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.lineX.disabled = false;
        chart.cursor.lineY.disabled = false;

        // chart legend
        chart.legend = new am4charts.Legend();
        chart.legend.useDefaultMarker = false;
        let markerTemplate = chart.legend.markers.template;
        markerTemplate.children.getIndex(0).cornerRadius(.5,.5,.5,.5)
        markerTemplate.width = 12
        markerTemplate.height = 12
        series1.legendSettings.labelText = "Monthly Cases [bold {darkblue}]{value}[/]";
        series2.legendSettings.labelText = "Daily Cases [bold {darkblue}]{value}[/]";
        
        // Set the data for the chart: set chartData state to chart. chartData will update to chart_data passed in, w/ updateChart fnc
        // setChartData(chart)
        return () => {
            chart.dispose()
        }
    }, [chart_data])

    useLayoutEffect(() => {
        let total = 0
        for(let i = 0; i<chart_data.length; i++){
            total += chart_data[i].value
        }
        setTotalCases(total)

        // Create chart instance
        let chart4 = am4core.create("charttrial_toggle", am4charts.XYChart)
        chart4.data = chart_data

        // Create date axes and value axes
        let dateAxis4 = chart4.xAxes.push(new am4charts.DateAxis());
        dateAxis4.renderer.grid.template.stroke = "white";
        dateAxis4.renderer.grid.template.strokeWidth = 1; 
        dateAxis4.renderer.grid.template.strokeOpacity = .2;
        dateAxis4.renderer.grid.template.strokeDasharray = "3,3"
        dateAxis4.dateFormats.setKey("day", "M/d/yy");
        dateAxis4.periodChangeDateFormats.setKey("day", "M/d/yy");
        dateAxis4.dateFormats.setKey("week", "M/d/yy");
        dateAxis4.periodChangeDateFormats.setKey("week", "M/d/yy");
        dateAxis4.dateFormats.setKey("month", "M/d/yy");
        dateAxis4.periodChangeDateFormats.setKey("month", "M/d/yy");
    
        let valueAxis5 = chart4.yAxes.push(new am4charts.ValueAxis());
        valueAxis5.title.text = "Daily Count";
        valueAxis5.min = 0;
        valueAxis5.title.fontWeight = 600;
        valueAxis5.renderer.grid.template.stroke = "white";
        valueAxis5.renderer.grid.template.strokeWidth = 1; 
        valueAxis5.renderer.grid.template.strokeOpacity = .2;
        valueAxis5.renderer.grid.template.strokeDasharray = "3,3";

        let valueAxis6 = chart4.yAxes.push(new am4charts.ValueAxis());
        valueAxis6.title.text = "Monthly Count";
        valueAxis6.min = 0
        valueAxis6.title.fontWeight = 600;
        valueAxis6.renderer.opposite = true;
        
        // Setting up toolTipText
        let toolTipText = `{key}
        [bold]Monthly Cases: {monthly_cases}
        [bold]Daily Cases: {value}`

        // Create series (the data sets)
        let series6 = chart4.series.push(new am4charts.LineSeries());
        series6.dataFields.valueY = "monthly_cases";
        series6.dataFields.dateX = "key";
        series6.name = "Monthly Cases";
        series6.tooltipText = `{key}
        [bold]Monthly Cases: {monthly_cases}`;
        series6.yAxis = valueAxis6;
        series6.fillOpacity = 0.4;

        let series7 = chart4.series.push(new am4charts.ColumnSeries());
        series7.dataFields.valueY = "value";
        series7.dataFields.dateX = "key";
        series7.name = "Daily Cases";
        // series2.tooltipText = toolTipText;
        series7.columns.template.tooltipText = `{key}
        [bold]Daily Cases: {value}`;
        chart4.tooltip.label.fill = am4core.color("#f00");
        series7.clustered = true;
        series7.fill = am4core.color(color);
        series7.stroke = am4core.color(color);
        series7.columns.template.width = am4core.percent(80);

        
        var toggle = (ev) =>{
            let series = ev.target.dataItem.dataContext

            if(series.className == 'ColumnSeries'){
                toggleDaily = !toggleDaily
                console.log('change daily', toggleDaily)
                if(toggleDaily){
                    series7.fillOpacity = .15
                    series7.opacity = .2
                } else{
                    series7.fillOpacity = 1
                    series7.opacity = 1
                }
            }
            else {
                toggleMonthly = !toggleMonthly
                console.log('change monthly', toggleMonthly)
                if(toggleMonthly){
                    series6.fillOpacity = .23;
                    series6.opacity = .3;
                } else{
                    series6.fillOpacity = .4;
                    series6.opacity = 1;
                }
            }
        }
        
        // toggle(series1); toggle(series2)
        // chart cursor on 
        chart4.cursor = new am4charts.XYCursor();
        chart4.cursor.lineX.disabled = false;
        chart4.cursor.lineY.disabled = false;

        // chart legend
        chart4.legend = new am4charts.Legend();
        chart4.legend.useDefaultMarker = false;
        chart4.legend.itemContainers.template.togglable = false;

        
        chart4.legend.itemContainers.template.events.on("hit", toggle);
        // chart.legend.itemContainers.template.events.off("hit", toggle, this);
        let marker4Template = chart4.legend.markers.template;
        marker4Template.children.getIndex(0).cornerRadius(.5,.5,.5,.5)
        marker4Template.width = 12
        marker4Template.height = 12
        series6.legendSettings.labelText = "Monthly Cases [bold {darkblue}]{value}[/]";
        series7.legendSettings.labelText = "Daily Cases [bold {darkblue}]{value}[/]";
        
        // Set the data for the chart: set chartData state to chart. chartData will update to chart_data passed in, w/ updateChart fnc
        // setChartData(chart)
        return () => {
            chart4.dispose()
        }
    }, [chart_data])

    useLayoutEffect(() => {
        // Create chart instance
        let chart3 = am4core.create("charttrial_1yaxis", am4charts.XYChart)
        chart3.data = chart_data
        // Create date axes and value axes
        let dateAxis3 = chart3.xAxes.push(new am4charts.DateAxis());
        dateAxis3.renderer.grid.template.stroke = "white";
        dateAxis3.renderer.grid.template.strokeWidth = 1; 
        dateAxis3.renderer.grid.template.strokeOpacity = .2;
        dateAxis3.renderer.grid.template.strokeDasharray = "3,3"
        dateAxis3.dateFormats.setKey("day", "M/d/yy");
        dateAxis3.periodChangeDateFormats.setKey("day", "M/d/yy");
        dateAxis3.dateFormats.setKey("week", "M/d/yy");
        dateAxis3.periodChangeDateFormats.setKey("week", "M/d/yy");
        dateAxis3.dateFormats.setKey("month", "M/d/yy");
        dateAxis3.periodChangeDateFormats.setKey("month", "M/d/yy");
    
        let valueAxis4 = chart3.yAxes.push(new am4charts.ValueAxis());
        valueAxis4.title.text = "Daily & Monthly Count";
        valueAxis4.min = 0;
        valueAxis4.title.fontWeight = 600;
        valueAxis4.renderer.grid.template.stroke = "white";
        valueAxis4.renderer.grid.template.strokeWidth = 1; 
        valueAxis4.renderer.grid.template.strokeOpacity = .2;
        valueAxis4.renderer.grid.template.strokeDasharray = "3,3";

        // Setting up toolTipText
        let toolTipText3 = `{key}
        [bold]Monthly Cases: {monthly_cases}
        [bold]Daily Cases: {value}`

        // Create series (the data sets)
        let series4 = chart3.series.push(new am4charts.LineSeries());
        series4.dataFields.valueY = "monthly_cases";
        series4.dataFields.dateX = "key";
        series4.name = "Monthly Cases";
        series4.tooltipText = `{key}
        [bold]Monthly Cases: {monthly_cases}`;
        series4.yAxis = valueAxis4;
        series4.fillOpacity = 0.4;

        let series5 = chart3.series.push(new am4charts.ColumnSeries());
        series5.dataFields.valueY = "value";
        series5.dataFields.dateX = "key";
        series5.name = "Daily Cases";
        // series2.tooltipText = toolTipText;
        series5.columns.template.tooltipText = `{key}
        [bold]Daily Cases: {value}`;
        chart3.tooltip.label.fill = am4core.color("#f00");
        series5.clustered = true;
        series5.fill = am4core.color(color);
        series5.stroke = am4core.color(color);
        series5.columns.template.width = am4core.percent(80);

        // chart cursor on 
        chart3.cursor = new am4charts.XYCursor();
        chart3.cursor.lineX.disabled = false;
        chart3.cursor.lineY.disabled = false;

        // chart legend
        chart3.legend = new am4charts.Legend();
        chart3.legend.useDefaultMarker = false;
        let marker3Template = chart3.legend.markers.template;
        marker3Template.children.getIndex(0).cornerRadius(.5,.5,.5,.5)
        marker3Template.width = 12
        marker3Template.height = 12
        series4.legendSettings.labelText = "Monthly Cases [bold {color}]{value}[/]";
        series5.legendSettings.labelText = "Daily Cases [bold {color}]{value}[/]";
       
        return () => {
            chart3.dispose()
        }
    }, [chart_data])
    
    return (
        <div>
            <Card>
                <CardHeader>
                    <div>
                        <CardTitle tag='h4'>
                            {t("incident_chart.trend")}&nbsp;-&nbsp;
                            {(totalCases > 0) ? t("incident_chart.total_cases", { count: totalCases })
                            : t("incident_chart.no_data")
                            }
                            {state ? " : " + stateFullName(state) : ""}
                        </CardTitle>
                    </div>
                </CardHeader>
                <CardBody>
                <div className='recharts-wrapper'>
                    {(totalCases === 0 && !isFirstLoadData) ?  (
                        <>
                        <p className='add-data-button'>
                            <Trans i18nKey='no_data_please_report'>
                            There is no data collected in the selected location and date range yet. Please click 
                                <a href='https://forms.gle/HRkVKW2Sfp7BytXj8' target='_blank'>here</a>
                                to report incidents to us.
                            </Trans>
                        </p>
                        <div className='drop-down'/>
                        </>
                    ) : null}
                    <div id='charttrial' style={{ width: '100%', height: '400px' }}></div>
                </div>
                </CardBody>
                <CardBody>
                <div className='recharts-wrapper'>
                    {(totalCases === 0 && !isFirstLoadData) ?  (
                        <>
                        <p className='add-data-button'>
                            <Trans i18nKey='no_data_please_report'>
                            There is no data collected in the selected location and date range yet. Please click 
                                <a href='https://forms.gle/HRkVKW2Sfp7BytXj8' target='_blank'>here</a>
                                to report incidents to us.
                            </Trans>
                        </p>
                        <div className='drop-down'/>
                        </>
                    ) : null}
                    <div id='charttrial_toggle' style={{ width: '100%', height: '400px' }}></div>
                </div>
                </CardBody>
                <CardBody>
                <div className='recharts-wrapper'>
                    {(totalCases === 0 && !isFirstLoadData) ?  (
                        <>
                        <p className='add-data-button'>
                            <Trans i18nKey='no_data_please_report'>
                            There is no data collected in the selected location and date range yet. Please click 
                                <a href='https://forms.gle/HRkVKW2Sfp7BytXj8' target='_blank'>here</a>
                                to report incidents to us.
                            </Trans>
                        </p>
                        <div className='drop-down'/>
                        </>
                    ) : null}
                    <div id='charttrial_1yaxis' style={{ width: '100%', height: '400px' }}></div>
                </div>
                </CardBody>
            </Card>
        </div>
    )
}

export default IncidentChartTrial
