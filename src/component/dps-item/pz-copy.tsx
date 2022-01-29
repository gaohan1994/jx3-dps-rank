import React, { useCallback, useState } from 'react';
import { Button, Modal, notification, Input, Tooltip } from 'antd';
import { CoreHelper } from 'jx3-dps-core';
import { useDispatch } from 'react-redux';
import {
  calculateJDCResultAction,
  replaceJDCCharacterAttributes,
  resetJDCCharacterAttributes,
} from '@core/action';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { PZCopyTip } from '@component/log/pz-copy-tip';
import { JDCDropdown } from '@component/dps-core';
import { getJsonFromBox, mapBoxJsonToCalcolator } from '@core/util';

const { TextArea } = Input;
/**
 * @todo 导入配装器功能
 *
 * 从剑三魔盒配装器导入属性到计算器中
 * 魔盒配装器导出数据格式为JSON
 */
export const PZCopy = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const [visible, setVisible] = useState(false);
  const openImportModal = useCallback(() => setVisible(true), []);
  const closeImportModal = useCallback(() => setVisible(false), []);
  const onChangeValue = useCallback(event => setValue(event.target.value), []);

  const onResetCharacter = () => {
    Modal.confirm({
      title: '清空角色属性',
      content: '确定清空角色属性吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        dispatch(resetJDCCharacterAttributes());
      },
    });
  };

  const onImportCharacter = useCallback(() => {
    try {
      const copyJson = getJsonFromBox(value);
      if (!copyJson) {
        return notification.error({ message: '请复制正确的配装数据' });
      }
      const copyCore = mapBoxJsonToCalcolator(copyJson);
      dispatch([replaceJDCCharacterAttributes(copyCore), calculateJDCResultAction()]);

      notification.success({ message: '导入成功！' });
      closeImportModal();
    } catch (error) {
      notification.error({ message: '请复制正确的配装数据' });
    }
  }, [value]);

  const howToImportPZ = () => {
    window.open('https://www.jx3box.com/tool/31607');
  };

  return (
    <>
      <div className='calculator-bar'>
        <Button type='primary' onClick={openImportModal}>
          魔盒配装器导入
        </Button>
        <Button onClick={onResetCharacter}>清空角色属性</Button>
      </div>
      <Modal
        title={
          <div>
            魔盒配装器导入
            <Tooltip title='如何导入'>
              <span className='calculator-import-icon' onClick={howToImportPZ}>
                <QuestionCircleOutlined />
              </span>
            </Tooltip>
          </div>
        }
        visible={visible}
        centered={true}
        footer={null}
        onCancel={closeImportModal}
      >
        <TextArea
          value={value}
          onChange={onChangeValue}
          rows={7}
          placeholder='请粘贴从剑三魔盒配装器复制的数据'
        />

        <div className='calculator-import-content'>
          <PZCopyTip />
          <JDCDropdown JDCDataName={CoreHelper.GainGroupTypes.Weapons} useDescription={false} />
          <JDCDropdown
            JDCDataName={CoreHelper.GainGroupTypes.SetBonusesGain}
            multiple={true}
            useDescription={false}
          />

          <Button type='primary' size='large' onClick={onImportCharacter}>
            识别导入并计算
          </Button>
        </div>
      </Modal>
    </>
  );
};
