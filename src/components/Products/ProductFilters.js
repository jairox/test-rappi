import React, { Component } from 'react';

const filters = [
    {
        name: "Disponibilidad",
        attr: "available",
        options: [
            {
                name: "Disponible",
                value: true
            },
            {
                name: "No Disponible",
                value: false
            }
        ]
    },
    {
        name: "Precio",
        attr: "price",
        options: [
            {
                name: "0 - $5,000",
                value: [0, 5000]
            },
            {
                name: "$5,000 - $10,000",
                value: [5000, 10000]
            },
            {
                name: "$10,000 - $15,000",
                value: [10000, 15000]
            },
            {
                name: "$15,000+",
                value: [15000, null]
            }
        ]
    },
    {
        name: "Cantidad",
        attr: "quantity",
        options: [
            {
                name: "0 - 300",
                value: [0, 300]
            },
            {
                name: "300 - 600",
                value: [300, 600]
            },
            {
                name: "600+",
                value: [600, null]
            },
        ]
    }
];

class ProductFilters extends Component {
    constructor(props) {
        super(props);

        this.state = {
            availableFilters: filters,
            activeFilters: [],
        };
    }

    setFilter(filter, value) {

        let filters = this.state.activeFilters;

        let existingIndex = filters.findIndex(fil => fil.attr === filter);

        if ( existingIndex > -1 ) {
            if ( filters[existingIndex].value === value ) {
                filters.splice(existingIndex, 1)
            } else {
                filters[existingIndex].value = value;
            }
        } else {
            filters.push({
                'attr': filter,
                'value': value
            });
        }

        this.setState({
            activeFilters: filters
        }, () => {
            this.props.onFilter(this.state.activeFilters);
        });
    }

    render() {
        return (
            <div className="columns">
                {this.state.availableFilters.map(filter => {
                    return (
                        <div className="column is-4" key={filter.attr}>
                            <div className="field">
                                <label className="label">{filter.name}</label>
                                <div className="buttons">
                                {filter.options.map((opt, index) => {
                                    let buttonClass = this.state.activeFilters.some(fil => fil.attr === filter.attr && fil.value === opt.value) ? 'is-primary' : '';
                                    return (
                                        <button key={`${filter.attr}-opt${index}`} className={`button ${buttonClass}`} onClick={() => this.setFilter(filter.attr, opt.value)}>{opt.name}</button>
                                    )
                                })}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default ProductFilters;