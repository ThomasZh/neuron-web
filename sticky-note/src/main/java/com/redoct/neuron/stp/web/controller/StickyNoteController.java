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
import com.redoct.neuron.sup.blog.domain.StickyNote;
import com.redoct.neuron.sup.blog.service.SupBlogService;

@Controller
@RequestMapping(path = "/stickynote")
public class StickyNoteController {

	private static final Logger LOGGER = LoggerFactory.getLogger(StickyNoteController.class);
	@Autowired
	private SupBlogService blogService;

	@RequestMapping(path = "/index", method = RequestMethod.GET)
	public String initRecentlyNotesForm(@RequestParam("boardId") String boardId, Map<String, Object> model) {
		List<StickyNote> uncompletedNotes = blogService.findStickyNote(boardId, false, System.currentTimeMillis(), 20);
		List<StickyNote> completedNotes = blogService.findStickyNote(boardId, true, System.currentTimeMillis(), 20);
		Board board = blogService.findBoard(boardId);

		model.put("board", board);
		model.put("uncompletedNotes", uncompletedNotes);
		model.put("completedNotes", completedNotes);
		return "stickynote/index";
	}

	@RequestMapping(path = "/add", method = RequestMethod.GET)
	public String initAddNoteForm(@RequestParam("boardId") String boardId, Map<String, Object> model) {
		Board board = blogService.findBoard(boardId);
		
		model.put("board", board);
		return "stickynote/add";
	}

	@RequestMapping(path = "/edit", method = RequestMethod.GET)
	public String initEditNoteForm(HttpServletRequest request, HttpServletResponse response,
			@RequestParam("boardId") String boardId, @RequestParam("id") String id, @RequestParam("title") String title,
			@RequestParam("completed") String completed, @RequestParam("color") String color, Map<String, Object> model)
					throws UnsupportedEncodingException {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");

		String utf8str = new String(title.getBytes("iso8859-1"), "utf-8");
		LOGGER.debug("before edit note, [ iso8859-1 = {}, color = {}, completed = {} ]", title, color, completed);
		LOGGER.debug("before edit note, [ utf-8 = {}, color = {}, completed = {} ]", utf8str, color, completed);
		Board board = blogService.findBoard(boardId);
		
		model.put("board", board);
		model.put("id", id);
		model.put("title", utf8str);
		model.put("color", color);
		model.put("completed", completed);
		return "stickynote/edit";
	}

	@RequestMapping(path = "/add-action", method = RequestMethod.GET)
	public String initAfterAddNoteForm(HttpServletRequest request, HttpServletResponse response,
			@RequestParam("boardId") String boardId, @RequestParam("title") String title,
			@RequestParam("color") String color, Map<String, Object> model) throws UnsupportedEncodingException {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");

		String utf8str = new String(title.getBytes("iso8859-1"), "utf-8");
		LOGGER.debug("before add note, [ iso8859-1 = {}, color = {} ]", title, color);
		LOGGER.debug("before add note, [ utf-8 = {}, color = {} ]", utf8str, color);

		String id = blogService.addNote(boardId, utf8str, color, System.currentTimeMillis());
		LOGGER.info("add note success, [ title = {}, color = {}, id = {} ]", utf8str, color, id);
		List<StickyNote> uncompletedNotes = blogService.findStickyNote(boardId, false, System.currentTimeMillis(), 20);
		List<StickyNote> completedNotes = blogService.findStickyNote(boardId, true, System.currentTimeMillis(), 20);
		Board board = blogService.findBoard(boardId);
		
		model.put("board", board);
		model.put("uncompletedNotes", uncompletedNotes);
		model.put("completedNotes", completedNotes);
		return "stickynote/index";
	}

	@RequestMapping(path = "/edit-action", method = RequestMethod.GET)
	public String initAfterEditNoteForm(HttpServletRequest request, HttpServletResponse response,
			@RequestParam("boardId") String boardId, @RequestParam("id") String id, @RequestParam("title") String title,
			@RequestParam("color") String color, Map<String, Object> model) throws UnsupportedEncodingException {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");

		String completed = request.getParameter("completed");
		String utf8str = new String(title.getBytes("iso8859-1"), "utf-8");
		LOGGER.debug("before add note, [ iso8859-1 = {}, color = {}, completed = {} ]", title, color, completed);
		LOGGER.debug("before add note, [ utf-8 = {}, color = {}, completed = {} ]", utf8str, color, completed);

		blogService.modifyNote(id, utf8str, color, completed != null ? true : false, System.currentTimeMillis());
		LOGGER.info("edit note success, [ title = {}, color = {}, completed = {}, id = {} ]", utf8str, color, completed,
				id);
		List<StickyNote> uncompletedNotes = blogService.findStickyNote(boardId, false, System.currentTimeMillis(), 20);
		List<StickyNote> completedNotes = blogService.findStickyNote(boardId, true, System.currentTimeMillis(), 20);
		Board board = blogService.findBoard(boardId);
		
		model.put("board", board);
		model.put("uncompletedNotes", uncompletedNotes);
		model.put("completedNotes", completedNotes);
		return "stickynote/index";
	}

	@RequestMapping(path = "/remove-action", method = RequestMethod.GET)
	public String initAfterRemoveNoteForm(@RequestParam("boardId") String boardId, @RequestParam("id") String id,
			Map<String, Object> model) throws UnsupportedEncodingException {
		blogService.removeNote(id, System.currentTimeMillis());
		LOGGER.info("remove note success, [ id = {} ]", id);
		List<StickyNote> uncompletedNotes = blogService.findStickyNote(boardId, false, System.currentTimeMillis(), 20);
		List<StickyNote> completedNotes = blogService.findStickyNote(boardId, true, System.currentTimeMillis(), 20);
		Board board = blogService.findBoard(boardId);
		
		model.put("board", board);
		model.put("uncompletedNotes", uncompletedNotes);
		model.put("completedNotes", completedNotes);
		return "stickynote/index";
	}

}
