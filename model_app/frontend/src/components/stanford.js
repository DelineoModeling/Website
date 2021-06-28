/* copied code from COVID-19 MOBILITY NETWORK MODELING
will be deleted later 
*/

$(function () {
    $('.nojs').remove();
    var data = {};

    function setupEpiCurvesGraph() {
        var parent = $('#epicurves-wrapper');
        var width = 500;
        var height = 250;
        var margin = {
            top: 35,
            right: 150,
            bottom: 30,
            left: 80
        };
        var plots = ["Modeled (scenario)", "Modeled (actual)", "Reported cases"];
        var keys = [// "cases_lower-income",
            "cases_overall" // "cases_higher-income",
        ].map(function (k) {
            return {
                m: k + "_mean",
                u: k + "_97.5",
                l: k + "_2.5"
            };
        });
        var strokes = [[// "red",
            "red" // "blue"
        ], ["green"], ["black"]];
        var svg = d3.create("svg").attr("viewBox", [0, 0, width, height]);
        svg.append("text").attr("x", margin.left + (width - margin.left - margin.right) / 2).attr("y", 20).style("text-anchor", "middle").style("font-family", "sans-serif").text("Cumulative COVID-19 cases over time");
        var node = svg.node();
        var x = d3.scaleTime();
        var y = d3.scaleLinear();
        var xg = svg.append("g");
        var yg = svg.append("g");

        var xAxis = function xAxis(g) {
            return g.attr("transform", "translate(0,".concat(height - margin.bottom, ")")).call(d3.axisBottom(x).ticks(width / 40).tickSizeOuter(0).tickFormat(d3.timeFormat("%-m/%-d")));
        };

        var yAxis = function yAxis(g) {
            return g.attr("transform", "translate(".concat(margin.left, ",0)")).call(d3.axisLeft(y).tickFormat(d3.format(".2s")));
        };

        var xLabel = svg.append("text").attr("transform", "rotate(-90)").attr("x", 0 - height / 2).attr("y", margin.left / 4).attr("dy", "0.5em").style("text-anchor", "middle").style("font-size", "13px").style("font-family", "sans-serif").text("Cumulative confirmed cases");
        var legend = svg.append("g").attr("transform", "translate(".concat(margin.left + 5, ", ").concat(margin.top, ")"));
        plots.forEach(function (p, i) {
            return [// "Low income",
                "" // "Overall", 
                // "High income"
            ].forEach(function (label, j) {
                legend.append("line").attr("x1", 5).attr("x2", 25).attr("y1", 5 + i * 15).attr("y2", 5 + i * 15).attr("stroke", strokes[i][j]).attr("stroke-width", 1.5).attr("stroke-dasharray", i == 2 ? "6 3" : "");
                legend.append("text").style("font-size", "11px").style("font-family", "sans-serif").attr("y", 9 + i * 15).attr("x", 30).text([p, label].join(' '));
            });
        });
        var linesAndAreas = plots.map(function (p, i) {
            return keys.map(function (key, j) {
                if (i < plots.length - 1) {
                    var m = key.m,
                        u = key.u,
                        l = key.l;
                    var line = d3.line().defined(function (d) {
                        return !isNaN(d[m]) && d[m] !== null;
                    }).x(function (d) {
                        return x(d.date);
                    }).y(function (d) {
                        return y(d[m]);
                    });
                    var area = d3.area().defined(function (d) {
                        return !isNaN(d[u]) && d[u] !== null && !isNaN(d[l]) && d[l] !== null;
                    }).x(function (d) {
                        return x(d.date);
                    }).y0(function (d) {
                        return y(d[u]);
                    }).y1(function (d) {
                        return y(d[l]);
                    });
                    var areaPath = svg.append("path").attr("class", "area").attr("fill", strokes[i][j]).attr("fill-opacity", "0.1");
                    var linePath = svg.append("path").attr("class", "line").attr("fill", "none").attr("stroke", strokes[i][j]).attr("stroke-width", 1.5).attr("stroke-linejoin", "round").attr("stroke-linecap", "round");
                    return {
                        line: line,
                        area: area,
                        linePath: linePath,
                        areaPath: areaPath
                    };
                } else {
                    var line = d3.line().defined(function (d) {
                        return !isNaN(d.reported_cases) && d.reported_cases !== null;
                    }).x(function (d) {
                        return x(d.date);
                    }).y(function (d) {
                        return y(d.reported_cases);
                    });
                    var linePath = svg.append("path").attr("class", "line").attr("fill", "none").attr("stroke", strokes[i][j]).attr("stroke-width", 2.5).attr("stroke-linejoin", "round").attr("stroke-linecap", "round").attr("stroke-dasharray", "4 8");
                    return {
                        line: line,
                        linePath: linePath
                    };
                }
            });
        });
        var caseDifference = svg.append("g").attr("transform", "translate(".concat(width - margin.right + 5, ", 0)"));
        var caseLine = d3.line();
        var caseLinePath = caseDifference.append("path").attr("class", "line").attr("fill", "none").attr("stroke", "orange").attr("stroke-width", 2.5);
        var caseLineText = caseDifference.append("text").style("font-size", "13px").style("font-family", "sans-serif").attr("x", 15).property("_current", 0);
        var scenarioData, actualData, reportedData;

        function updateDelta() {
            if (!scenarioData || !actualData) {
                return;
            } // console.log("using data", scenarioData, actualData);


            var upper = scenarioData[scenarioData.length - 1][keys[0].m];
            var lower = actualData[actualData.length - 1][keys[0].m];
            var delta = {
                pts: [[0, y(upper)], [10, y(upper)], [10, y(lower)], [0, y(lower)]],
                upper: upper,
                lower: lower
            }; // console.log("delta", delta);

            return delta;
        }

        var msa = 0;
        var msaPeaks = [30000, 240000, 650000];

        node.transitionUpdate = function () {
            var _this = this;

            if (!scenarioData || !actualData || !reportedData) {
                return;
            } // console.log("epicurve transition!");


            var data = [scenarioData, actualData, reportedData];
            linesAndAreas.forEach(function (p, i) {
                return p.forEach(function (la) {
                    la.linePath.datum(data[i], function (d) {
                        return d.date;
                    }).transition().duration(shiftDelay).attr("d", la.line);

                    if (la.areaPath) {
                        la.areaPath.datum(data[i], function (d) {
                            return d.date;
                        }).transition().duration(shiftDelay).attr("d", la.area);
                    }
                });
            });
            var delta = updateDelta();

            if (delta) {
                caseLinePath.datum(delta.pts).transition().duration(shiftDelay).attr("d", caseLine);
                caseLineText.datum(delta).transition().duration(shiftDelay).attr("y", function (d) {
                    return y(d.lower + (d.upper - d.lower) / 2) + 3;
                }).textTween(function (d) {
                    var i = d3.interpolate(_this._current, [d.upper - d.lower]);
                    return function (t) {
                        return t ? "+ ".concat(d3.format(".3s")(_this._current = i(t)), " cases") : '';
                    };
                });
            }

            x.domain(d3.extent(scenarioData, function (d) {
                return d.date;
            })).nice().range([margin.left, width - margin.right]);
            y.domain([0, msaPeaks[msa]]).nice() // d => Math.max.apply(null, keys.map(k => d[k.u])))]).nice()
                .range([height - margin.bottom, margin.top]);
            xg.transition().duration(rescaleDelay).delay(shiftDelay).call(xAxis);
            yg.transition().duration(rescaleDelay).delay(shiftDelay).call(yAxis);
            linesAndAreas.forEach(function (p, i) {
                return p.forEach(function (la) {
                    la.linePath.datum(data[i], function (d) {
                        return d.date;
                    }).transition().delay(shiftDelay).duration(rescaleDelay).attr("d", la.line);

                    if (la.areaPath) {
                        la.areaPath.datum(data[i], function (d) {
                            return d.date;
                        }).transition().delay(shiftDelay).duration(rescaleDelay).attr("d", la.area);
                    }
                });
            });
            delta = updateDelta();

            if (delta) {
                caseLinePath.datum(delta.pts).transition().delay(shiftDelay).duration(rescaleDelay).attr("d", caseLine);
                caseLineText.datum(delta).transition().delay(shiftDelay).duration(rescaleDelay).attr("y", function (d) {
                    return y(d.lower + (d.upper - d.lower) / 2) + 3;
                }).textTween(function (d) {
                    var i = d3.interpolate(_this._current, [d.upper - d.lower]);
                    return function (t) {
                        return t ? "+ ".concat(d3.format(".3s")(_this._current = i(t)), " cases") : '';
                    };
                });
            }

            shiftDelay = 500;
            rescaleDelay = 500;
        };

        var shiftDelay = 0;
        var rescaleDelay = 0;

        node.update = function (data) {
            scenarioData = data; // console.log("updating epicurves", data);

            this.transitionUpdate();
        };

        node.updateActual = function (data) {
            actualData = data; // console.log("actual numbers are", data);

            this.transitionUpdate();
        };

        node.updateReports = function (data) {
            reportedData = data;
            this.transitionUpdate();
        };

        node.reset = function (msaId) {
            // console.log("resetting!");
            actualData = scenarioData = reportedData = null;
            msa = msaId;
        };

        parent.append(node);
        return node;
    }

    function setupMobilityGraph() {
        var parent = $('#mobility-wrapper');
        var width = 500;
        var height = 250;
        var margin = {
            top: 35,
            right: 150,
            bottom: 30,
            left: 80
        };
        var plots = ["Scenario", "Actual"];
        var strokes = ["red", "black"];
        var svg = d3.create("svg").attr("viewBox", [0, 0, width, height]);
        svg.append("text").attr("x", margin.left + (width - margin.left - margin.right) / 2).attr("y", 20).style("text-anchor", "middle").style("font-family", "sans-serif").text("Mobility at POIs over time");
        var node = svg.node();
        var x = d3.scaleTime();
        var y = d3.scaleLinear();
        var xg = svg.append("g");
        var yg = svg.append("g");

        var xAxis = function xAxis(g) {
            return g.attr("transform", "translate(0,".concat(height - margin.bottom, ")")).call(d3.axisBottom(x).ticks(width / 40).tickSizeOuter(0).tickFormat(d3.timeFormat("%-m/%-d")));
        };

        var yAxis = function yAxis(g) {
            return g.attr("transform", "translate(".concat(margin.left, ",0)")).call(d3.axisLeft(y).tickFormat(d3.format(".2s")));
        };

        var xLabel = svg.append("text").attr("transform", "rotate(-90)").attr("x", 0 - height / 2).attr("y", margin.left / 4).attr("dy", "0.5em").style("text-anchor", "middle").style("font-size", "13px").style("font-family", "sans-serif").text("Total POI visits per day");
        var legend = svg.append("g").attr("transform", "translate(".concat(width - margin.left - margin.right, ", ").concat(margin.top, ")"));
        plots.forEach(function (label, i) {
            legend.append("line").attr("x1", 5).attr("x2", 25).attr("y1", 5 + i * 15).attr("y2", 5 + i * 15).attr("stroke", strokes[i]).attr("stroke-width", 1.5);
            legend.append("text").style("font-size", "11px").style("font-family", "sans-serif").attr("y", 9 + i * 15).attr("x", 30).text(label);
        });
        var lastAreaData = [[], []];

        function areaDataZipped() {
            if (!lastAreaData[0] || !lastAreaData[1]) {
                return [];
            }

            return lastAreaData[0].map(function (a, i) {
                return [a, lastAreaData[1][i]];
            });
        }

        var area = d3.area().defined(function (d) {
            return !isNaN(d[0].mobility_overall) && d[0].mobility_overall > 0 && !isNaN(d[1].mobility_overall) && d[1].mobility_overall > 0;
        }).x(function (d) {
            return x(d[0].date);
        }).y0(function (d) {
            return y(d[1].mobility_overall);
        }).y1(function (d) {
            return y(d[0].mobility_overall);
        });
        var areaPath = svg.append("path").attr("class", "area").attr("fill", "orange").attr("fill-opacity", "0.25");
        var lines = plots.map(function (p, i) {
            var line = d3.line().defined(function (d) {
                return !isNaN(d.mobility_overall) && d.mobility_overall > 0;
            }).x(function (d) {
                return x(d.date);
            }).y(function (d) {
                return y(d.mobility_overall);
            });
            var linePath = svg.append("path").attr("class", "line").attr("fill", "none").attr("stroke", strokes[i]).attr("stroke-width", 1.5).attr("stroke-linejoin", "round").attr("stroke-linecap", "round");
            return {
                line: line,
                area: area,
                linePath: linePath
            };
        });
        var mobilityDifference = svg.append("g").attr("transform", "translate(".concat(width - margin.right + 5, ", 0)"));
        var mobilityLine = d3.line();
        var mobilityLinePath = mobilityDifference.append("path").attr("class", "line").attr("fill", "none").attr("stroke", "orange").attr("stroke-width", 2.5);
        var mobilityLineText = mobilityDifference.append("text").style("font-size", "13px").style("font-family", "sans-serif").attr("x", 15).property("_current", 0);
        var scenarioData, actualData;

        function updateDelta() {
            if (!scenarioData || !actualData) {
                return;
            }

            var sd = scenarioData.filter(function (d) {
                return d.mobility_overall !== null;
            });
            var ad = actualData.filter(function (d) {
                return d.mobility_overall !== null;
            }); // console.log("using data", scenarioData, actualData);

            var upper = sd[sd.length - 1].mobility_overall;
            var lower = ad[ad.length - 1].mobility_overall;
            var delta = {
                pts: [[0, y(upper)], [10, y(upper)], [10, y(lower)], [0, y(lower)]],
                upper: d3.sum(sd, function (d) {
                    return d.mobility_overall;
                }),
                lower: d3.sum(ad, function (d) {
                    return d.mobility_overall;
                })
            }; // console.log("delta", delta);

            return delta;
        }

        var shiftDelay = 0;
        var rescaleDelay = 0;

        node.transitionUpdate = function () {
            var _this2 = this;

            if (!scenarioData || !actualData) {
                return;
            } // console.log("mobility transition update");


            lastAreaData = [scenarioData, actualData];
            lines.forEach(function (l, i) {
                return lastAreaData[i] && l.linePath.datum(lastAreaData[i], function (d) {
                    return d.date;
                }).transition().duration(shiftDelay).attr("d", l.line);
            });
            areaPath.datum(areaDataZipped(), function (d) {
                return d[0].date;
            }).transition().duration(shiftDelay).attr("d", area);
            var delta = updateDelta();

            if (delta) {
                mobilityLinePath.datum(delta.pts).transition().duration(shiftDelay).attr("d", mobilityLine);
                mobilityLineText.datum(delta).transition().duration(shiftDelay).attr("y", function (d) {
                    return d.pts[3][1] + (d.pts[0][1] - d.pts[3][1]) / 2 + 3;
                }).textTween(function (d) {
                    var i = d3.interpolate(_this2._current, [d.upper - d.lower]);
                    return function (t) {
                        return t ? "+ ".concat(d3.format(".3s")(_this2._current = i(t)), " visits") : '';
                    };
                });
            }

            x.domain(d3.extent(scenarioData, function (d) {
                return d.date;
            })).nice().range([margin.left, width - margin.right]);
            y.domain([0, d3.max(scenarioData, function (d) {
                return d.mobility_overall;
            })]).nice().range([height - margin.bottom, margin.top]);
            xg.transition().duration(rescaleDelay).delay(shiftDelay).call(xAxis);
            yg.transition().duration(rescaleDelay).delay(shiftDelay).call(yAxis);
            lines.forEach(function (l, i) {
                return lastAreaData[i] && l.linePath.datum(lastAreaData[i], function (d) {
                    return d.date;
                }).transition().delay(shiftDelay).duration(rescaleDelay).attr("d", l.line);
            });
            areaPath.datum(areaDataZipped(), function (d) {
                return d[0].date;
            }).transition().delay(shiftDelay).duration(rescaleDelay).attr("d", area);
            delta = updateDelta();

            if (delta) {
                mobilityLinePath.datum(delta.pts).transition().delay(shiftDelay).duration(rescaleDelay).attr("d", mobilityLine);
                mobilityLineText.datum(delta).transition().delay(shiftDelay).duration(rescaleDelay).attr("y", function (d) {
                    return d.pts[3][1] + (d.pts[0][1] - d.pts[3][1]) / 2 + 3;
                }).textTween(function (d) {
                    var i = d3.interpolate(_this2._current, [d.upper - d.lower]);
                    return function (t) {
                        return t ? "+ ".concat(d3.format(".3s")(_this2._current = i(t)), " visits") : '';
                    };
                });
            }

            shiftDelay = 500;
            rescaleDelay = 500;
        };

        node.update = function (data) {
            scenarioData = data; // console.log("updating mobility", data);

            this.transitionUpdate();
        };

        node.updateActual = function (data) {
            actualData = data; // console.log("actual numbers are", data);

            this.transitionUpdate();
        };

        node.reset = function () {
            actualData = scenarioData = null;
        };

        parent.append(node);
        return node;
    }

    function setupPOIsGraph() {
        var parent = $('#pois-wrapper');
        var width = 600;
        var height = 200;
        var margin = {
            top: 30,
            right: 250,
            bottom: 30,
            left: 80
        };
        var pois = ["full-service_restaurants", "fitness_centers", "limited-service-restaurants", "religious_organizations", "grocery_stores", "department_stores", "pharmacies_&_drug_stores"].map(function (l) {
            return 'mobility_' + l;
        });
        var strokes = ["blue", "orange", "green", "red", "purple", "brown", "pink"];
        var svg = d3.create("svg").attr("viewBox", [0, 0, width, height]).attr("class", "overflow");
        svg.append("text").attr("x", margin.left + (width - margin.left - margin.right) / 2).attr("y", 20).style("text-anchor", "middle").style("font-family", "sans-serif").text("Mobility per POI category over time");
        var node = svg.node();
        var x = d3.scaleTime();
        var y = d3.scaleLinear();
        var xg = svg.append("g");
        var yg = svg.append("g");

        var xAxis = function xAxis(g) {
            return g.attr("transform", "translate(0,".concat(height - margin.bottom, ")")).call(d3.axisBottom(x).ticks(width / 40).tickSizeOuter(0).tickFormat(d3.timeFormat("%-m/%-d")));
        };

        var yAxis = function yAxis(g) {
            return g.attr("transform", "translate(".concat(margin.left, ",0)")).call(d3.axisLeft(y).tickFormat(d3.format(".2s")));
        };

        var xLabel = svg.append("text").attr("transform", "rotate(-90)").attr("x", 0 - height / 2).attr("y", margin.left / 4).attr("dy", "0.5em").style("text-anchor", "middle").style("font-size", "13px").style("font-family", "sans-serif").text("Total POI visits per day");
        var legend = svg.append("g").attr("transform", "translate(".concat(width - margin.right, ", ").concat(margin.top, ")"));
        pois.forEach(function (label, i) {
            legend.append("line").attr("x1", 5).attr("x2", 25).attr("y1", 5 + i * 15).attr("y2", 5 + i * 15).attr("stroke", strokes[i]).attr("stroke-width", 1.5);
            legend.append("text").style("font-size", "11px").style("font-family", "sans-serif").attr("y", 9 + i * 15).attr("x", 30).text(TOGGLE_LABELS[i]);
        });
        var lines = pois.map(function (p, i) {
            var line = d3.line().defined(function (d) {
                return !isNaN(d[p]) && d[p] > 0;
            }).x(function (d) {
                return x(d.date);
            }).y(function (d) {
                return y(d[p]);
            });
            var linePath = svg.append("path").attr("class", "line").attr("fill", "none").attr("stroke", strokes[i]).attr("stroke-width", 1.5).attr("stroke-linejoin", "round").attr("stroke-linecap", "round");
            return {
                line: line,
                linePath: linePath
            };
        });
        var scenarioData;
        var shiftDelay = 0;
        var rescaleDelay = 0;

        node.transitionUpdate = function () {
            if (!scenarioData) {
                return;
            } // console.log("mobility transition update");


            lines.forEach(function (l, i) {
                return l.linePath.datum(scenarioData, function (d) {
                    return d.date;
                }).transition().duration(shiftDelay).attr("d", l.line);
            });
            x.domain(d3.extent(scenarioData, function (d) {
                return d.date;
            })).nice().range([margin.left, width - margin.right]);
            y.domain([0, d3.max(scenarioData, function (d) {
                return d3.max(pois, function (k) {
                    return d[k];
                });
            })]).nice().range([height - margin.bottom, margin.top]);
            xg.transition().duration(rescaleDelay).delay(shiftDelay).call(xAxis);
            yg.transition().duration(rescaleDelay).delay(shiftDelay).call(yAxis);
            lines.forEach(function (l, i) {
                return l.linePath.datum(scenarioData, function (d) {
                    return d.date;
                }).transition().delay(shiftDelay).duration(rescaleDelay).attr("d", l.line);
            });
            var currentToggleStates = toggleStates();
            legend.selectAll('text').text(function (d, i) {
                return TOGGLE_LABELS[i] + " " + (!currentToggleStates[i] ? "(scenario)" : "(actual)");
            });
            shiftDelay = 500;
            rescaleDelay = 500;
        };

        node.update = function (data) {
            scenarioData = data; // console.log("updating pois", data);

            this.transitionUpdate();
        };

        node.reset = function () {
            scenarioData = null;
        };

        var wrapper = $('<div class="poi-wrapper closed"><span class="wrapper-toggle">+</span><h6>Visits per POI category over time</h6></div>');
        var toggle = wrapper.find('.wrapper-toggle');
        toggle.click(function () {
            return wrapper.toggleClass('closed');
        });
        wrapper.append(node);
        wrapper.append($('<p>This graph illustrates the amount of mobility you would have had for each POI category under your scenario. For "no reduction" categories (<img src="/images/go.png" width="18" />), mobility patterns from the first week of March are looped. For the "actual" categories (<img src="/images/stop.png" width="18" />), actual mobility patterns with real levels of mobility reduction are used.</p>'));
        parent.append(wrapper);
        return node;
    }

    var TOGGLE_LABELS = ["Full-service restaurants", "Fitness centers", "Takeout restaurants", "Religious organizations", "Grocery stores", "Department stores", "Pharmacies"];

    function setupToggles() {
        var parent = $('#options-wrapper');
        return TOGGLE_LABELS.map(function (label, i) {
            var toggle = new ToggleButton(label, i);
            parent.append(toggle.check);
            return toggle;
        });
    }

    function setupScenarioDescription() {
        var parent = $('#options-wrapper');
        var elt = $("<p class='scenario-description'>Scenario: <span class='scenario'>actual conditions.</span></p>");
        parent.append(elt);
        return function () {
            var states = toggleStates();
            var labels = TOGGLE_LABELS.filter(function (v, i) {
                return !states[i];
            }).map(function (l) {
                return "<i>" + l.toLocaleLowerCase() + "</i>";
            });
            var text = "actual conditions.";

            switch (labels.length) {
                case 0:
                    break;

                case 1:
                    text = "What if we hadn't reduced mobility at " + labels[0] + "?";
                    break;

                case 2:
                    text = "What if we hadn't reduced mobility at " + labels[0] + " and " + labels[1] + "?";
                    break;

                default:
                    text = "What if we hadn't reduced mobility at " + labels.slice(0, -1).join(", ") + ", and " + labels[labels.length - 1] + "?";
            }

            elt.find('.scenario').html(text);
        };
    }

    function ToggleButton(label, id) {
        var check = $('<label class="switch"><input type="checkbox" ' + (id === 0 ? '' : 'checked') + ' /><span class="slider round"></span><span class="label-text">' + label + "</span></label>");
        check.change(function (e) {
            updateScenarioDescription();
            loadDataForCurrentState();
        });
        this.check = check;
        return this;
    }

    function toggleStates() {
        return toggles.map(function (t) {
            return t.check.find('input').is(":checked");
        });
    }

    function msaState() {
        return msa.find(function (t) {
            return t.find('input').is(":checked");
        }).msaId;
    }

    function setupMsaBar() {
        var parent = $('#msa-tabs');
        var ids = ["sf", "chi", "nyc"];
        return ["San Francisco", "Chicago", "New York"].map(function (label, i) {
            var tab = $('<label class="tab"><input type="radio" name="msa" value="' + ids[i] + '"' + (i == 0 ? " checked" : "") + '/><span class="label-text">' + label + '</span></label>');
            tab.change(function (e) {
                resetGraphs(i);
                loadDataForCurrentState();
                loadDataForActual();
                loadReportedCases();
            });
            tab.msaId = ids[i];
            parent.append(tab);
            return tab;
        });
    }

    function updateActual() {
        var k = keyFromButtonSet(msaState(), 'actual');
        epicurves.updateActual(data[k].data);
        mobility.updateActual(data[k].data);
    }

    function updateViews(k) {
        if (k === keyFromButtonSet(msaState(), toggleStates())) {
            epicurves.update(data[k].data);
            mobility.update(data[k].data);
            pois.update(data[k].data);
        }
    }

    function updateReports() {
        var k = keyFromButtonSet(msaState(), 'reported_cases');
        epicurves.updateReports(data[k].data);
    }

    function keyFromButtonSet(msa) {
        var buttonSetOrKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'actual';
        var regions = {
            sf: 'San_Francisco_Oakland_Hayward_CA',
            chi: 'Chicago_Naperville_Elgin_IL_IN_WI',
            nyc: 'New_York_Newark_Jersey_City_NY_NJ_PA'
        };
        var labels = ['FR', 'FC', 'LR', 'RO', 'GS', 'DS', 'PH'];
        var filteredLabels = typeof buttonSetOrKey === 'string' ? buttonSetOrKey : labels.filter(function (k, i) {
            return !buttonSetOrKey[i];
        }).sort().join('_') || "actual";
        return "".concat(msa, "/").concat(regions[msa], "-").concat(filteredLabels);
    }

    function loadDataForButtonSet(msa, buttonSet) {
        var k = keyFromButtonSet(msa, buttonSet); // 'fake'+(buttonSet[0] ? "-closed" : '');

        if (!data[k]) {
            data[k] = {
                state: 'pending'
            };
            $.get('/data/' + k + '.csv', function (realData, status, xhr) {
                if (realData) {
                    data[k].data = d3.csvParse(realData, function (d) {
                        return d3.autoType($.extend({}, d, {
                            date: d.date.replace(/[^\d]/g, '-') + "T23:00:00.000Z"
                        }));
                    });
                    data[k].state = "loaded"; // console.log("loading fake data", data[k]);

                    if (buttonSet === 'actual') {
                        // console.log("got actual from key", k);
                        updateActual();
                    } else if (buttonSet == 'reported_cases') {
                        updateReports();
                    } else {
                        updateViews(k);
                    }
                }
            });
        } else if (data[k].state === 'pending') {
            return;
        } else {
            if (buttonSet === 'actual') {
                updateActual();
            } else if (buttonSet === 'reported_cases') {
                updateReports();
            } else {
                updateViews(k);
            }
        } // console.log("Loading for button set", buttonSet);

    }

    function loadDataForCurrentState() {
        // console.log("loading from current state!", msaState());
        loadDataForButtonSet(msaState(), toggleStates());
    }

    function loadDataForActual() {
        // console.log("loading actual");
        loadDataForButtonSet(msaState(), 'actual');
    }

    function loadReportedCases() {
        // console.log("loading reported");
        loadDataForButtonSet(msaState(), 'reported_cases');
    }

    function resetGraphs(msaId) {
        epicurves.reset(msaId);
        mobility.reset(msaId);
    }

    var epicurves = setupEpiCurvesGraph();
    var mobility = setupMobilityGraph();
    var pois = setupPOIsGraph();
    var toggles = setupToggles();
    var updateScenarioDescription = setupScenarioDescription();
    updateScenarioDescription();
    var msa = setupMsaBar();
    loadDataForActual();
    loadDataForCurrentState();
    loadReportedCases();
});