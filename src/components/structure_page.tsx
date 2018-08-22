import * as React from 'react';
import { fillSubSites, filterData, exportToPng } from '../api/structure_functions.js';

export default class StructurePage extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            currentSelection: '',
            sites: [],
            structureWidth: 5,
            alignment: 'Compact',
            filterSites: '',
            drawTimes: 0
        };
    }

    onStructureWidthChangetype(e: any) {
        this.setState({
            structureWidth: e.target.value
        });
    }

    componentDidMount() {
        this.setState({
            sites: JSON.parse(localStorage.sites)
        });
    }

    selectChange(e: any, term: any) {
        this.setState({
            [term]: e.target.value
        });
    }

    getPng() {
        const svg = exportToPng();
        const link = document.createElement('a');
        link.download = `${this.state.filterSites === '' ? 'Home' : this.state.filterSites}.png`;
        link.href = svg.src;
        link.click();
    }

    drawStructure() {
        const filteredSites = filterData(this.state.sites, this.state.filterSites);
        const diagram: any = document.getElementsByClassName('diagram')[0];
        const diagramContainer: any = document.getElementById('diagramContainer');
        if (this.state.drawTimes > 0) {
            diagram.remove();
            var newDiagram = document.createElement('div');
            newDiagram.id = `${diagram}${this.state.drawTimes}`;
            newDiagram.className = 'diagram';
            diagramContainer.appendChild(newDiagram);
            fillSubSites(filteredSites, this.state.structureWidth, newDiagram);
        } else {
            fillSubSites(filteredSites, this.state.structureWidth, diagram);
        }
        this.setState({
            drawTimes: this.state.drawTimes + 1
        });
    }

    render() {
        return (
            <div className="container structure">
                <div className="row structure">
                    <div className="col s3">
                        Structure Width
                        <input
                            onChange={(e) => this.onStructureWidthChangetype(e)}
                            type="number"
                            min="0"
                            max="50"
                            value={this.state.structureWidth}
                        />
                    </div>
                    <div className="input-field col s3">
                        Filter by subsite:
                        <select onChange={(e) => this.selectChange(e, 'filterSites')}>
                            {
                                this.state.sites.map((e: any) => {
                                    let url = e.url.split('/');
                                    url = url[url.length - 1];
                                    return <option key={url} value={url}>{url}</option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="input-field col s3">
                        Alignment
                            <select onChange={(e) => this.selectChange(e, 'alignment')}>
                            <option value="Compact">Compact</option>
                            <option value="Wide">Wide</option>
                        </select>
                    </div>
                </div>
                <button className="btn-flat" onClick={() => this.drawStructure()}> Draw </button>
                <button className="btn-flat" onClick={() => this.getPng()}> Export to PNG </button>
                <div id="diagramContainer">
                    <div id="diagram" className="diagram" />
                </div>
            </div>
        );
    }
}