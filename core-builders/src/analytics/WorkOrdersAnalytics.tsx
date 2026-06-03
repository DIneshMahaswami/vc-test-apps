/* @analytics-builder
{
  "v": 1,
  "config": {
    "title": "Work Orders",
    "dataset": "work_orders",
    "defaultPeriod": "month",
    "enablePeriodSelector": true,
    "enableComparison": true,
    "enableGlobalFilters": true,
    "dateField": "work_order_date",
    "availableFilters": [
      {
        "field": "work_order_type",
        "label": "Work Order Type"
      },
      {
        "field": "contractor_id",
        "label": "Contractor",
        "advanced": true
      }
    ],
    "globalFilters": {},
    "widgets": [
      {
        "id": "widget-wo-001",
        "type": "kpi",
        "title": "Total Spend",
        "dimensions": [],
        "measures": [
          {
            "field": "work_order_amount",
            "aggregation": "sum"
          }
        ],
        "layout": {
          "columnSpan": 6
        }
      },
      {
        "id": "widget-wo-002",
        "type": "kpi",
        "title": "Total Orders",
        "dimensions": [],
        "measures": [
          {
            "field": "work_order_amount",
            "aggregation": "count",
            "format": "number"
          }
        ],
        "layout": {
          "columnSpan": 6
        }
      },
      {
        "id": "widget-wo-003",
        "type": "bar",
        "title": "Monthly Spend",
        "dimensions": [
          {
            "field": "work_order_date"
          }
        ],
        "measures": [
          {
            "field": "work_order_amount",
            "aggregation": "sum"
          }
        ],
        "layout": {
          "columnSpan": 6
        }
      },
      {
        "id": "widget-wo-004",
        "type": "pie",
        "title": "Spend by Type",
        "dimensions": [
          {
            "field": "work_order_type"
          }
        ],
        "measures": [
          {
            "field": "work_order_amount",
            "aggregation": "sum"
          }
        ],
        "layout": {
          "columnSpan": 6
        }
      }
    ]
  }
}
*/
import React from 'react';
import { AnalyticsDashboard, WidgetConfig, Resource} from '@mahaswami/vc-frontend';
import { Menu } from 'react-admin';
import AnalyticsIcon from '@mui/icons-material/Analytics';

export const WorkOrdersAnalytics: React.FC = () => {
    const widgets: WidgetConfig[] = [
        {
            "id": "widget-wo-001",
            "type": "kpi",
            "title": "Total Spend",
            "dimensions": [],
            "measures": [
                {
                    "field": "work_order_amount",
                    "aggregation": "sum"
                }
            ],
            "layout": {
                "columnSpan": 6
            }
        },
        {
            "id": "widget-wo-002",
            "type": "kpi",
            "title": "Total Orders",
            "dimensions": [],
            "measures": [
                {
                    "field": "work_order_amount",
                    "aggregation": "count",
                    "format": "number"
                }
            ],
            "layout": {
                "columnSpan": 6
            }
        },
        {
            "id": "widget-wo-003",
            "type": "bar",
            "title": "Monthly Spend",
            "dimensions": [
                {
                    "field": "work_order_date"
                }
            ],
            "measures": [
                {
                    "field": "work_order_amount",
                    "aggregation": "sum"
                }
            ],
            "layout": {
                "columnSpan": 6
            }
        },
        {
            "id": "widget-wo-004",
            "type": "pie",
            "title": "Spend by Type",
            "dimensions": [
                {
                    "field": "work_order_type"
                }
            ],
            "measures": [
                {
                    "field": "work_order_amount",
                    "aggregation": "sum"
                }
            ],
            "layout": {
                "columnSpan": 6
            }
        }
    ];

    return (
        <AnalyticsDashboard
            title="Work Orders"
            dataset="work_orders"
            defaultPeriod="month"
            enablePeriodSelector={true}
            enableComparison={true}
            enableGlobalFilters={true}
            availableFilters={[
                      {
                                "field": "work_order_type",
                                "label": "Work Order Type"
                      },
                      {
                                "field": "contractor_id",
                                "label": "Contractor",
                                "advanced": true
                      }
            ]}
            widgets={widgets}
            config={{
                dateField: 'work_order_date'
            }}
        />
    );
};

const ANALYTICS_RESOURCE = 'work_orders_analytics';

export const WorkOrdersAnalyticsResource = (
    <Resource
        name={ANALYTICS_RESOURCE}
        icon={AnalyticsIcon}
        hasAnalytics
        list={<WorkOrdersAnalytics />}
    />
);

export const WorkOrdersAnalyticsMenu = () => (
    <Menu.Item to={`/${ANALYTICS_RESOURCE}`} primaryText="Work Orders" leftIcon={<AnalyticsIcon />} />
);
