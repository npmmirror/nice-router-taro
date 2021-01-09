import React, { useEffect } from 'react'
import NavigationService from '@/nice-router/navigation-service'
import { View } from '@tarojs/components'
import { useSelector } from 'react-redux'
import { Current } from '@tarojs/taro'
import _ from 'lodash'
import { LoadingType } from '@/nice-router/nice-router-util'
import ListofPageBase from '@/listof/listof-page-base'
import './object-picker-page.scss'
import { AtFloatLayout } from 'taro-ui'
import Listof from '@/listof/listof'
import { useVisible } from '@/service/use-service'

function ObjectPickerPage() {
  const { visible, close, show } = useVisible(false)

  // q如果变化了，就发送一个后台请求
  const { linkToUrl } = Current.router.params
  useEffect(() => {
    if (linkToUrl) {
      NavigationService.ajax(
        linkToUrl,
        {},
        {
          loading: LoadingType.modal,
        }
      )
    }
  }, [linkToUrl])

  const root = useSelector((state) => state.objectPicker)
  const { selectedItems = [], inbound = {} } = root
  const { list = [], maxSelectCount } = inbound

  const handleCommit = async () => await NavigationService.back(selectedItems)

  const actionList = [
    { id: 'object-action-1', title: `已选 ${selectedItems.length}`, onClick: show },
    { id: 'object-action-2', title: `确定`, onClick: handleCommit },
  ]

  const theList = list.map((it) => ({
    ...it,
    checked: _.findIndex(selectedItems, { id: it.id }) > -1,
  }))

  return (
    <View className='object-picker'>
      <ListofPageBase {...inbound} list={theList} displayMode='object-picker' actionList={actionList} />
      <AtFloatLayout
        className='large-float-layout'
        isOpened={visible}
        onClose={close}
        title={`已选择，最多可选${maxSelectCount}`}
      >
        <Listof list={selectedItems} displayMode='object-picker-popup' emptyMessage='还没有选择！' />
        <View className='object-picker-popup-bottom' />
      </AtFloatLayout>
    </View>
  )
}

export default ObjectPickerPage
