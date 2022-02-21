import React, {ReactEventHandler} from "react";
import {VehicleFilter, VehicleType, vehicleTypes, vehicleTypeTitles} from "../data/vehicles/contracts";
import {VehicleApi} from "../data/vehicles/api";
import {VehicleTypeSelect} from "./VehicleTypeSelect";

interface MyProps {
    setVehicles: Function;
}

interface IstateFilter {
    value: string
    selectValue: VehicleType | null
}

export class Filter extends React.Component<MyProps, IstateFilter> {

    state: IstateFilter = {
        value: '',
        selectValue: null
    }

    handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        this.setState({value: inputValue})

        const searchPar: VehicleFilter = {
            title: "",
            type: null
        }

        if (inputValue !== '') {
            vehicleTypes.map(type => {
                if (vehicleTypeTitles[type].toLowerCase().includes(inputValue.toLowerCase())) {
                    searchPar.type = type
                }
            })
        }

        const date = VehicleApi.search(searchPar)
        this.props.setVehicles(date)
    }

    handlerSelector = (type:VehicleType | null) => {
        this.setState({selectValue: type})

        const searchPar: VehicleFilter = {
            title: "",
            type: type
        }

        const date = VehicleApi.search(searchPar)
        this.props.setVehicles(date)
    }

    render(): React.ReactNode {
        return <div>
            <p>Filter</p>
            <input
                value={this.state.value}
                type="text"
                onChange={this.handlerChange}
            />
            <br/>
            <VehicleTypeSelect value={this.state.selectValue} onChange={this.handlerSelector}/>
        </div>
    }
}
