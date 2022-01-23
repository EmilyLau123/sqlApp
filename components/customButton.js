import {COLORS, SIZES, ICONS, STRINGS, STATUS, STYLES} from '../components/style/theme.js';
import {
    Button,
    } from 'react-native-elements';
import React from 'react';

export default class customButton extends React.Component{
    render() { 
        return (
        <Button title='View Details' 
                  buttonStyle={{
                    backgroundColor: COLORS.primary,
                    borderWidth: 2,
                    borderColor: COLORS.primary,
                    borderRadius: 30,
                  }}
                  containerStyle={{
                    width: 'auto',
                    marginHorizontal: 50,
                    marginVertical: 10,
                  }}
                  titleStyle={{ fontWeight: 'bold' }}
                  onPress={()=>alert("Jump to the statement's detail page")}/>
        );
    }
}
