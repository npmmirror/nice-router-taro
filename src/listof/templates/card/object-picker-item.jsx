import React from 'react'
import { Text, View } from '@tarojs/components'
import CardTemplate from './card-template'
import './object-picker-item.scss'
import NavigationService from '@/nice-router/navigation-service'

function ObjectPickerItem(props) {
  const { item } = props
  const handleClick = () => NavigationService.dispatch('objectPicker/selectItem', item)
  return (
    <View className='object-picker-item' onClick={handleClick}>
      <View className='object-picker-item-option'>
        <Text className={`iconfont iconfont-radio${item.checked ? '-checked' : ''}`} />
      </View>
      <CardTemplate {...props} />
    </View>
  )
}

export default ObjectPickerItem
