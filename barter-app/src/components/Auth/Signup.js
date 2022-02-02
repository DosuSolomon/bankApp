import React, { useState } from 'react'
import { Component } from 'react-redux'
import { StyleSheet } from 'react-native'
import theme, { Box, Text } from '../theme'
import { Input, Form, Item, Button } from 'native-base'

const styles = StyleSheet.create({
  itemStyle: {
    marginTop: 20
  },
  btnStyle: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: theme.colors.barter
  }
})

function Signup ({ navigation, route }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  return (
    <Box flex={1} backgroundColor='white'>
      <Box paddingHorizontal='m' paddingVertical='m'>
        <Box marginTop='m'>
          <Form>
            <Item style={{ ...styles.itemStyle }}>
              <Input
                placeholder='Name & Surname'
                defaultValue={name}
                onChangeText={text => setName(text)}
              />
            </Item>
            <Item style={{ ...styles.itemStyle }}>
              <Input
                placeholder='Email Address'
                keyboardType='email-address'
                defaultValue={email}
                onChangeText={text => setEmail(text)}
              />
            </Item>
            <Item style={{ ...styles.itemStyle }}>
              <Button style={{...styles.btnStyle}}>
                <Text variant='title1' fontSize={18} fontWeight='700'>
                  Continue
                </Text>
              </Button>
            </Item>
          </Form>
        </Box>
      </Box>
    </Box>
  )
}
export default Signup
