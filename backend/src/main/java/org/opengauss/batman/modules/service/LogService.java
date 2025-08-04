/**
 * Copyright (c) 2016-2019 人人开源 All rights reserved.
 *
 * https://www.renren.io
 *
 * 版权所有，侵权必究！
 *
 * This program is free software;
 * you can redistribute it and/or modify it under the terms of the GNU General Public License as published
 * by the Free Software Foundation; version 2.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with this program;
 * if not, write to the Free Software Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 */

package org.opengauss.batman.modules.service;


import com.baomidou.mybatisplus.extension.service.IService;
import org.opengauss.batman.common.utils.PageUtils;
import org.opengauss.batman.modules.entity.LogEntity;

import java.util.Map;


/**
 * 系统日志
 *
 * @author Mark sunlightcs@gmail.com
 */
public interface LogService extends IService<LogEntity> {

    PageUtils queryPage(Map<String, Object> params);

}
