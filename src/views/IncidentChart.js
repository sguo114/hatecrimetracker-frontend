import { ThemeColors } from '@src/utility/context/ThemeColors'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'
import { Card, CardBody, CardHeader, CardTitle } from 'reactstrap'
import React, { useEffect, useLayoutEffect, useState, useContext } from 'react'
import { stateFullName } from '../utility/Utils';
import { useTranslation } from 'react-i18next';
import { Trans } from 'react-i18next';

am4core.useTheme(am4themes_animated)

/*
Example comes from here
https://www.amcharts.com/docs/v4/getting-started/integrations/using-react/
*/

//chartData is result from ___
const IncidentChartTrial = ({chart_data, state, isFirstLoadData}) => {
    const { t } = useTranslation();
    const [totalCases, setTotalCases] = useState(0);
    const [chartData, setChartData] = useState();
    
    const updateChart = (data) => {
        if(!chartData) return 
        chartData.data = data

        let total = 0
        for(let i = 0; i<data.length; i++){
            total += data[i].value
        }
        setTotalCases(total)
    }

    useEffect(()=>{
        updateChart(chart_data)
    }, [chart_data])
    
    useLayoutEffect(() => {
        // Create chart instance
        let chart = am4core.create("charttrial", am4charts.XYChart)

        // Create date axes and value axes
        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    
        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = "Daily Count";
        valueAxis.min = 0;
        valueAxis.title.fontWeight = 600;

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
        series2.fill = am4core.color("yellow");
        series2.stroke = am4core.color("yellow");
        series2.columns.template.width = am4core.percent(80);

        // chart cursor on 
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.lineX.disabled = false;
        chart.cursor.lineY.disabled = false;

        // chart legend
        chart.legend = new am4charts.Legend();
        chart.legend.useDefaultMarker = false;
        let marker = chart.legend.markers.template.children.getIndex(0);
        marker.cornerRadius(12, 12, 12, 12);
        marker.strokeWidth = 2;
        marker.strokeOpacity = 1;
        marker.stroke = am4core.color("#ccc");
        series1.legendSettings.labelText = "Monthly Cases [bold {color}]{value}[/]";
        series2.legendSettings.labelText = "Daily Cases [bold {color}]{value}[/]";

        // Set the data for the chart: set chartData state to chart. chartData will update to chart_data passed in, w/ updateChart fnc
        setChartData(chart)
        return () => {
            chart.dispose()
        }
    }, [])
    
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
            </Card>
        </div>
    )
}

export default IncidentChartTrial
