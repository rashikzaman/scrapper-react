import React from "react";
import { shallow, mount } from "enzyme";
import Register from './register'
import { DataProvider } from '../contexts/DataContext';

describe('Register', function () {
    it('renders', () => {
        const wrapper = mount(
            <DataProvider me={{ email: "rashikzaman13@gmail.com" }}>
                <Register />
            </DataProvider>);
        expect(wrapper.find('input').exists()).toBeTruthy()
    })
})