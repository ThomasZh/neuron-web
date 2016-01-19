package com.redoct.neuron.stp.web.controller;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.redoct.neuron.sup.blog.domain.Board;
import com.redoct.neuron.sup.blog.service.SupBlogService;

@Controller
@RequestMapping(path = "/blackboard")
public class BlackBoardController {

	private static final Logger LOGGER = LoggerFactory.getLogger(BlackBoardController.class);
	@Autowired
	private SupBlogService blogService;

	@RequestMapping(path = "/index", method = RequestMethod.GET)
	public String initRecentlyBoardsForm(Map<String, Object> model) {
		List<Board> boards = blogService.findBoard(System.currentTimeMillis(), 20);
		model.put("boards", boards);
		return "blackboard/index";
	}

	@RequestMapping(path = "/add", method = RequestMethod.GET)
	public String initAddNoteForm(Map<String, Object> model) {
		return "blackboard/add";
	}

	@RequestMapping(path = "/add-action", method = RequestMethod.GET)
	public String initAfterAddBoardForm(HttpServletRequest request, HttpServletResponse response,
			@RequestParam("title") String title, Map<String, Object> model) throws UnsupportedEncodingException {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");

		String utf8str = new String(title.getBytes("iso8859-1"), "utf-8");
		LOGGER.debug("before add board, [ iso8859-1 = {} ]", title);
		LOGGER.debug("before add board, [ utf-8 = {} ]", utf8str);

		String id = blogService.addBoard(utf8str, System.currentTimeMillis());
		LOGGER.info("add board success, [ title = {}, id = {} ]", utf8str, id);

		List<Board> boards = blogService.findBoard(System.currentTimeMillis(), 20);
		model.put("boards", boards);
		return "blackboard/index";
	}

	@RequestMapping(path = "/remove-action", method = RequestMethod.GET)
	public String initAfterRemoveBoardForm(@RequestParam("id") String id, Map<String, Object> model)
			throws UnsupportedEncodingException {
		blogService.removeBoard(id, System.currentTimeMillis());
		LOGGER.info("remove board success, [ id = {} ]", id);

		List<Board> boards = blogService.findBoard(System.currentTimeMillis(), 20);
		model.put("boards", boards);
		return "blackboard/index";
	}

	@RequestMapping(path = "/edit", method = RequestMethod.GET)
	public String initEditForm(@RequestParam("id") String id, Map<String, Object> model)
			throws UnsupportedEncodingException {
		LOGGER.debug("goto edit note view, [ id = {} ]", id);
		Board board = blogService.findBoard(id);

		model.put("board", board);
		return "blackboard/edit";
	}

	@RequestMapping(path = "/edit-action", method = RequestMethod.GET)
	public String initAfterEditForm(HttpServletRequest request, HttpServletResponse response,
			@RequestParam("id") String id, @RequestParam("title") String title, Map<String, Object> model)
					throws UnsupportedEncodingException {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");

		String utf8str = new String(title.getBytes("iso8859-1"), "utf-8");
		LOGGER.debug("before edit note, [ iso8859-1 = {} ]", title);
		LOGGER.debug("before edit note, [ utf-8 = {} ]", utf8str);

		blogService.modifyBoard(id, utf8str, System.currentTimeMillis());
		LOGGER.info("edit note success, [ title = {}, id = {} ]", utf8str, id);

		List<Board> boards = blogService.findBoard(System.currentTimeMillis(), 20);
		model.put("boards", boards);
		return "blackboard/index";
	}

}
