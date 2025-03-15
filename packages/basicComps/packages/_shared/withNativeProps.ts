import React from 'react'
import type { CSSProperties, ReactElement } from 'react'
import classNames from 'classnames'

export interface NativeProps<S extends string = never> {
  className?: string
  style?: CSSProperties & Partial<Record<S, string>>
  tabIndex?: number
}

/**
 * 
 * @param props 
 * @param element 
 * @returns 实现Dom结构上props跟 传递进来的prop进行合并
 */
/**
 * 这是一个React组件属性合并工具
 * 主要功能：
 * 1. 合并className - 使用classNames库合并多个className
 * 2. 合并style - 将传入的style与原有style进行合并
 * 3. 合并其他原生属性 - 保证所有原生DOM属性都能正确传递
 * 
 * 使用场景：
 * - 当你需要在现有组件基础上添加额外的样式或属性时
 * - 在开发可复用组件时，需要保留原生属性的传递能力
 * 
 * 示例：
 * withNativeProps({ className: 'custom-class', style: { color: 'red' } }, <div>原始内容</div>)
 * // 输出: <div className="original-class custom-class" style={{ ...originalStyle, color: 'red' }}>原始内容</div>
 */
export function withNativeProps<P extends NativeProps>(props: P, element: ReactElement) {
  const p = {
    ...element.props
  }
  if (props.className) {
    p.className = classNames(element.props.className, props.className)
  }
  if (props.style) {
    p.style = {
      ...p.style,
      ...props.style
    }
  }
  // eslint-disable-next-line no-restricted-syntax
  for (const key in props) {
    // eslint-disable-next-line no-prototype-builtins, no-continue
    if (!props.hasOwnProperty(key)) continue;
      p[key] = props[key]
  }  
  const { children, ...rest } = p
  return React.cloneElement(element, rest)
}
