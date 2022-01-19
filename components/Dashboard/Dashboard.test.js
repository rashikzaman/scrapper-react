import React from "react";
import { shallow, mount } from "enzyme";
import Dashboard from './Dashboard'
import { DataProvider } from '../../contexts/DataContext';

describe('Dashboard', function () {
    it('renders', () => {
        const wrapper = mount(
            <DataProvider me={{ email: "rashikzaman13@gmail.com" }}>
                <Dashboard />
            </DataProvider>);
        expect(wrapper.find('button').exists()).toBeTruthy()
    })
})