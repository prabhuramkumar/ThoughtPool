'use strict'

/******************************* Dependencies ********************************/

// Third party
var React  = require('react/addons'),
    cx     = React.addons.classSet,
    _      = require('lodash')

// Custom components
var mixins = require('app-mixins'),
    Places = require('model/places'),
    pop    = require('model/popup').pop

/******************************** Components *********************************/

/**
* Contents of mainpage
*/
var Index = React.createClass({

  render: function() {return (

<div className='container'>

  <PlaceForm />

  {/* Duplicate PlaceList to observe databinding */}
  <PlaceList />
  <PlaceList />

</div>

  )}

})

/**
* Place input form
*/
var PlaceForm = React.createClass({

  render: function() {return (

<div className='alert alert-info'>
  <div className='place-form'>
    <div className='form-inline'>
      <div className='form-group'>
        <label className='block'>Place's name</label>
        <input valueLink={this.linkState('name')} type='text' className='form-control' />
      </div>
      <div className='form-group'>
        <label className='block'>City</label>
        <input valueLink={this.linkState('city')} type='text' className='form-control' />
      </div>
      <div className='form-group'>
        <label className='block'>Climate</label>
        <input valueLink={this.linkState('climate')} type='text' className='form-control' />
      </div>
    </div>
    <hr />
    <button className='btn btn-info' onClick={this.save}>Save place</button>
  </div>
</div>

  )},

  mixins: [mixins.link, mixins.gis],

  save: function() {
    return Places.do(Places.all.$create(this.state))
  }

})

/**
* List of places
*/
var PlaceList = React.createClass({

  render: function() {return (

<div className='panel panel-default'>
  <div className='panel-body'>
    <div className='row'>

      {_.map(Places.all, (place, index) =>
        <div key={index} className='col-xs-6 col-sm-4'>
          <pre className='bg-info name'>

            {/* Control buttons */}
            <div className='pull-right'>

              {/* Save */}
              <p><button className={cx({
                           'btn btn-xs btn-success': true,
                           'disabled': !place.$changed()
                         })}
                         onClick={() => Places.do(place.$save())}>
                <span className='fa fa-save' />
              </button></p>

              {/* Climate control */}
              {place.$isWarm() ?
                <p><button className='btn btn-xs btn-primary'
                           onClick={() => Places.do(place.$coolDown())}>
                  <span className='fa fa-minus-square-o' />
                </button></p>
              : <p><button className='btn btn-xs btn-warning'
                           onClick={() => Places.do(place.$warmUp())}>
                  <span className='fa fa-plus-square-o' />
                </button></p>}

              {/* Delete */}
              <p><button className='btn btn-xs btn-danger'
                         onClick={() => Places.do(place.$delete())}>
                         {/** ^
                          * A little bit of white magic here. When an element
                          * is deleted, it emits an event that causes its
                          * parent collection to remove it. Places.all is a
                          * collection, so it auto-updates.
                          */}
                <span className='fa fa-trash-o' />
              </button></p>
            </div>

            {/* Content fields */}
            <p>
              <span>Name: </span>
              <span contentEditable onInput={this.editor(place, 'name')}>{place.name}</span>
            </p>
            <p>
              <span>City: </span>
              <span contentEditable onInput={this.editor(place, 'city')}>{place.city}</span>
            </p>
            <p>
              <span>Climate: </span>
              <span contentEditable onInput={this.editor(place, 'climate')}>{place.climate}</span>
            </p>
            <p>
              <span>Recommendation: {place.climateModel.recommendation}</span>
            </p>

          </pre>
        </div>
      )}

    </div>
  </div>
</div>

  )},

  editor: function (object, key) {
    return event => Places.do(object[key] = event.target.textContent)
  },

  mixins: mixins.listen.Places

})

/********************************** Export ***********************************/

module.exports = Index
