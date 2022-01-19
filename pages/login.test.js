import React from "react";
import { shallow, mount } from "enzyme";
import Login from './login'
import { DataProvider } from '../contexts/DataContext';

describe('Login', function () {
    it('renders', () => {
        const wrapper = mount(
            <DataProvider me={{email : "rashikzaman13@gmail.com"}}>
                <Login />
            </DataProvider>);
        expect(wrapper.find('input').exists()).toBeTruthy()
    })
})