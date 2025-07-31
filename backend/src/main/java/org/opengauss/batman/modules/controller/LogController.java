/**
 * copyright owner or entity authorized by the copyright.
 * (C) 2007 Free Software Foundation; Inc. [http: fsf.org ]
 *
 */

package org.opengauss.batman.modules.controller;

import org.opengauss.batman.common.utils.PageUtils;
import org.opengauss.batman.common.utils.R;
import org.opengauss.batman.modules.service.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;


/**
 * 系统日志
 *
 * @author Mark sunlightcs@gmail.com
 */
@Controller
@RequestMapping("/sys/log")
public class LogController {
	@Autowired
	private LogService logService;
	
	/**
	 * 列表
	 */
	@ResponseBody
	@GetMapping("/list")
	public R list(@RequestParam Map<String, Object> params){
		PageUtils page = logService.queryPage(params);

		return R.ok().put("page", page);
	}
}
