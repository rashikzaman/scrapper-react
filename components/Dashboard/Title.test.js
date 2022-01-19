import React from "react";
import { shallow, mount } from "enzyme";
import Title from './Title'

describe('Keyword', function () {
    it('renders', () => {
        const wrapper = mount(
            <Title>Hello</Title>
        );
        expect(wrapper.find('h2').exists()).toBeTruthy()
    })
})