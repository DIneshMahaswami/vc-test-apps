/* @analytics-builder
{
  "v": 1,
  "config": {
    "title": "Invoices",
    "dataset": "invoices",
    "defaultPeriod": "month",
    "enablePeriodSelector": true,
    "enableComparison": true,
    "enableGlobalFilters": true,
    "dateField": "invoice_date",
    "availableFilters": [
      {
        "field": "rental_agreement.customer_id",
        "label": "Rental Agreement.customer",
        "advanced": true
      }
    ],
    "globalFilters": {},
    "widgets": [
      {
        "id": "widget-1780143847341",
        "type": "kpi",
        "title": "Revenue",
        "dimensions": [],
        "measures": [
          {
            "field": "total_amount",
            "aggregation": "sum"
          }
        ],
        "layout": {
          "columnSpan": 6
        }
      },
      {
        "id": "widget-1780143848677",
        "type": "kpi",
        "title": "Outstanding",
        "dimensions": [],
        "measures": [
          {
            "field": "total_amount",
            "aggregation": "sum"
          }
        ],
        "layout": {
          "columnSpan": 6
        },
        "filters": {
          "payment_status": [
            "pending",
            "overdue"
          ]
        }
      },
      {
        "id": "widget-1780143849995",
        "type": "bar",
        "title": "Monthly Income",
        "dimensions": [
          {
            "field": "invoice_date"
          }
        ],
        "measures": [
          {
            "field": "total_amount",
            "aggregation": "sum"
          }
        ],
        "layout": {
          "columnSpan": 6
        }
      },
      {
        "id": "widget-1780143851195",
        "type": "pie",
        "title": "Payments by Status",
        "dimensions": [
          {
            "field": "payment_status"
          }
        ],
        "measures": [
          {
            "field": "total_amount",
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

export const InvoicesAnalytics: React.FC = () => {
    const widgets: WidgetConfig[] = [
        {
            "id": "widget-1780143847341",
            "type": "kpi",
            "title": "Revenue",
            "dimensions": [],
            "measures": [
                {
                    "field": "total_amount",
                    "aggregation": "sum"
                }
            ],
            "layout": {
                "columnSpan": 6
            }
        },
        {
            "id": "widget-1780143848677",
            "type": "kpi",
            "title": "Outstanding",
            "dimensions": [],
            "measures": [
                {
                    "field": "total_amount",
                    "aggregation": "sum"
                }
            ],
            "layout": {
                "columnSpan": 6
            },
            "filters": {
                "payment_status": [
                    "pending",
                    "overdue"
                ]
            }
        },
        {
            "id": "widget-1780143849995",
            "type": "bar",
            "title": "Monthly Income",
            "dimensions": [
                {
                    "field": "invoice_date"
                }
            ],
            "measures": [
                {
                    "field": "total_amount",
                    "aggregation": "sum"
                }
            ],
            "layout": {
                "columnSpan": 6
            }
        },
        {
            "id": "widget-1780143851195",
            "type": "pie",
            "title": "Payments by Status",
            "dimensions": [
                {
                    "field": "payment_status"
                }
            ],
            "measures": [
                {
                    "field": "total_amount",
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
            title="Invoices"
            dataset="invoices"
            defaultPeriod="month"
            enablePeriodSelector={true}
            enableComparison={true}
            enableGlobalFilters={true}
            availableFilters={[
                      {
                                "field": "rental_agreement.customer_id",
                                "label": "Rental Agreement.customer",
                                "advanced": true
                      }
            ]}
            widgets={widgets}
            config={{
                dateField: 'invoice_date'
            }}
        />
    );
};

const ANALYTICS_RESOURCE = 'invoices_analytics';

export const InvoicesAnalyticsResource = (
    <Resource
        name={ANALYTICS_RESOURCE}
        icon={AnalyticsIcon}
        hasAnalytics
        list={<InvoicesAnalytics />}
    />
);

export const InvoicesAnalyticsMenu = () => (
    <Menu.Item to={`/${ANALYTICS_RESOURCE}`} primaryText="Invoices" leftIcon={<AnalyticsIcon />} />
);
