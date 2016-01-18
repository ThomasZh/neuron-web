package com.redoct.neuron.stp.web.model;

import java.util.Collection;

import org.springframework.beans.BeanUtils;

public class Utils {

	public static void copyProperties(Object source, Object target, String... ignoreProperties) {
		BeanUtils.copyProperties(source, target, ignoreProperties);
	}

	public static <T> void copyProperties(Collection<?> source, Class<T> targetType, Collection<T> target,
			String... ignoreProperties) {
		for (Object sourceEle : source) {
			try {
				T t = targetType.newInstance();
				BeanUtils.copyProperties(sourceEle, t, ignoreProperties);
				target.add(t);
			} catch (InstantiationException | IllegalAccessException e) {
				throw new RuntimeException(e);
			}
		}
	}

}
