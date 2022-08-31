import * as dateFns from 'date-fns';
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'
import { Card, CardBody, CardHeader, CardTitle } from 'reactstrap'
import React, { useEffect, useLayoutEffect, useState, useContext } from 'react'
import { stateFullName, getStateIncidentPer10kAsian, formatIncidentRate } from '../utility/Utils';
import { useTranslation } from 'react-i18next';
import { Trans } from 'react-i18next';

am4core.useTheme(am4themes_animated)

/*
Example comes from here
https://www.amcharts.com/docs/v4/getting-started/integrations/using-react/
*/

//chartData is result from ___

// monthly_data={'2021-01':100, '2021-02': 50...}
const IncidentChartPer10kAsian = ({ color, monthly_stats, date_range, state , isFirstLoadData}) => {
    const [monthlyData, setMonthlyData] = useState([])
    const { t } = useTranslation();
    const [totalCases, setTotalCases] = useState(0);  

    useLayoutEffect(() => {
        // prepare data  in monthly_data
        let monthly_data = [];
        let startDate = dateFns.set(date_range[0], {date:1}); //set to first day of the month
        let lastDate = dateFns.set(date_range[1], {date:1});
        lastDate = dateFns.addMonths(lastDate, 1); //set to first day of next the month
        let total = 0;
        for (let x_day = startDate; x_day < lastDate; x_day = dateFns.addMonths(x_day, 1)) {
            let month = dateFns.format(x_day, "yyyy-MM");
            if (monthly_stats[month]) {
                total += monthly_stats[month];
                monthly_data.push({
                    "key"   : month, //yyyy-MM
                    "cases" : monthly_stats[month],
                    "cases_per_10k" : formatIncidentRate(getStateIncidentPer10kAsian(monthly_stats[month], state))
                })
            }
            else {
                monthly_data.push({
                    "key"   : month, //yyyy-MM
                    "cases" : 0,
                    "cases_per_10k" : 0
                })
            }            
        }
        setTotalCases(total)

        // Create chart instance
        let chart2 = am4core.create("charttrial2", am4charts.XYChart)
        chart2.data = monthly_data
        
        let dateAxis2 = chart2.xAxes.push(new am4charts.DateAxis());
        dateAxis2.renderer.grid.template.stroke = "white";
        dateAxis2.renderer.grid.template.strokeWidth = 1; 
        dateAxis2.renderer.grid.template.strokeOpacity = .2;
        dateAxis2.renderer.grid.template.strokeDasharray = "3,3"
        dateAxis2.dateFormats.setKey("week", "M/yyyy");
        dateAxis2.periodChangeDateFormats.setKey("week", "M/yyyy");
        dateAxis2.dateFormats.setKey("month", "M/yyyy");
        dateAxis2.periodChangeDateFormats.setKey("month", "M/yyyy");
    
        let valueAxis3 = chart2.yAxes.push(new am4charts.ValueAxis());
        valueAxis3.title.text = t("monthly_per_10k_asian");
        valueAxis3.min = 0;
        valueAxis3.title.fontWeight = 600;
        valueAxis3.renderer.grid.template.stroke = "white";
        valueAxis3.renderer.grid.template.strokeWidth = 1; 
        valueAxis3.renderer.grid.template.strokeOpacity = .2;
        valueAxis3.renderer.grid.template.strokeDasharray = "3,3";

        // Setting up toolTipText
        let toolTipText2 = `{key}
        [bold]Monthly Cases: {cases_per_10k}`

        // Create series (the data sets)
        let series3 = chart2.series.push(new am4charts.ColumnSeries());
        series3.dataFields.valueY = "cases_per_10k";
        series3.dataFields.dateX = "key";
        series3.name = t("monthly_per_10k_asian");
        series3.tooltipText = `{key}
        [bold]Monthly Cases: {cases_per_10k}`;
        series3.yAxis = valueAxis3;
        series3.clustered = true;
        series3.fill = am4core.color(color);
        series3.stroke = am4core.color(color);

        // chart cursor on 
        chart2.cursor = new am4charts.XYCursor();
        chart2.cursor.lineX.disabled = false;
        chart2.cursor.lineY.disabled = false;

        // chart legend
        chart2.legend = new am4charts.Legend();
        chart2.legend.useDefaultMarker = false;
        let markerTemplate2 = chart2.legend.markers.template;
        markerTemplate2.children.getIndex(0).cornerRadius(.5,.5,.5,.5)
        markerTemplate2.width = 12
        markerTemplate2.height = 12
        series3.legendSettings.labelText = "Monthly Cases [bold {color}]{value}[/]";    

        setMonthlyData(chart2)
        // console.log('chart2 data', chart2.data)
        return () => {
            chart2.dispose()
        }
    }, [monthly_stats, date_range])

        
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
                    <div id='charttrial2' style={{ width: '100%', height: '400px' }}></div>
                </div>
                </CardBody>
            </Card>
        </div>
    )
}
export default IncidentChartPer10kAsian;
