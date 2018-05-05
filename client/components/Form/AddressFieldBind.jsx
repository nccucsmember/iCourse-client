// @flow

import React, { Component } from 'react';
import radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  reduxForm,
  Field,
  formValueSelector,
  change,
} from 'redux-form';

import Input from './Input.jsx';
import Selector from './Selector.jsx';
import * as GlobalActions from '../../actions/Global.js';

const styles = {
  wrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputWrapper: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

type Props = {
  fetchCityZones: Function,
  setZoneId: Function,
  setCityId: Function,
  cityZones: Array<Object>,
  cityId: Number,
  zoneId: Number,
  isForm: Boolean,
  needAddress: Boolean,
};

class AddressFieldBind extends Component {
  componentWillMount() {
    const {
      fetchCityZones,
      cityZones,
      zoneId,
      cityId,
    } = this.props;

    fetchCityZones();

    if (cityZones && zoneId && !cityId) {
      this.initialCityZone(cityZones, zoneId);
    }
  }

  componentWillReceiveProps({
    cityId,
    setZoneId,
    zoneId,
    cityZones,
  }) {
    if (cityZones && zoneId && !cityId) {
      this.initialCityZone(cityZones, zoneId);
    }

    if (cityId !== this.props.cityId && cityId) {
      if (this.props.cityId) setZoneId('-1');
    }
  }

  initialCityZone(cityZoneSource, selectedZoneId) {
    // This function is for initializing cityId, when exist zoneId but not cityId
    const {
      setCityId,
    } = this.props;

    const selectedCity = cityZoneSource.find(city =>
      city.Zones.find(zone => parseInt(zone.id, 10) === parseInt(selectedZoneId, 10)));

    if (selectedCity) {
      setCityId(selectedCity.id);
    }
  }

  props: Props

  render() {
    const {
      cityZones,
      cityId,
      isForm,
      needAddress,
    } = this.props;

    if (!cityZones) return null;

    const selectedCity = cityZones && cityId
      ? cityZones.find(c => c.id === parseInt(cityId, 10))
      : null;

    return (
      <div style={styles.wrapper}>
        <Field
          isForm={isForm}
          nullable
          name="cityId"
          label={isForm ? '*地址' : '地址'}
          options={cityZones}
          component={Selector} />
        <Field
          isForm={isForm}
          nullable
          name="zoneId"
          label={null}
          options={(selectedCity && selectedCity.Zones) || []}
          component={Selector} />
        {needAddress ? (
          <div style={styles.inputWrapper}>
            <Field
              isForm={isForm}
              name="address"
              label={null}
              placeholder="請輸入地址"
              component={Input} />
          </div>
        ) : null}
      </div>
    );
  }
}

export function wrapFormToAddress(formName) {
  if (!formName) return null;

  const selector = formValueSelector(formName);

  return connect(
    state => ({
      cityZones: state.Global.cityZones,
      cityId: selector(state, 'cityId'),
      zoneId: selector(state, 'zoneId'),
    }),
    dispatch => bindActionCreators({
      ...GlobalActions,
      setZoneId: v => change(formName, 'zoneId', v),
      setCityId: v => change(formName, 'cityId', v),
    }, dispatch)
  )(reduxForm({
    form: formName,
  })(radium(AddressFieldBind)));
}

export default radium(AddressFieldBind);
