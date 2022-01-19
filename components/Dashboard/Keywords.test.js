import React from "react";
import { shallow, mount } from "enzyme";
import Keywords from './Keywords'

describe('Keyword', function () {
    it('renders', () => {
        const wrapper = mount(
            <Keywords keywords={[]}/>
        );
        expect(wrapper.find('table').exists()).toBeTruthy()
    })
})