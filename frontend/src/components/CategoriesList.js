import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';

export class CategoriesList extends Component {
  render() {

    const categories = this.props.categories;

    return (
      <div>
          <Grid container spacing={24} style={{padding: 20}}>
            {categories.map(category => (
                <Grid key={category.name} item xs={12} sm={4} lg={4} xl={3}>                    
                    {category.name}
                </Grid>
            ))}
          </Grid>        
      </div>
    )
  }
}

export default CategoriesList
