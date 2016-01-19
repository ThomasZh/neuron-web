package com.redoct.neuron.stp.web.controller;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.redoct.neuron.sup.blog.domain.BlogArticle;
import com.redoct.neuron.sup.blog.domain.BlogComment;
import com.redoct.neuron.sup.blog.service.SupBlogService;

@Controller
@RequestMapping(path = "/blog")
public class BlogController {

	private static final Logger LOGGER = LoggerFactory.getLogger(BlogController.class);
	@Autowired
	private SupBlogService blogService;

	@RequestMapping(path = "/homepage", method = RequestMethod.GET)
	public String initRecentlyArticlesForm(Map<String, Object> model) {
		List<BlogArticle> articles = blogService.find(System.currentTimeMillis(), 4);
		model.put("articles", articles);
		return "blog/homepage";
	}

	@RequestMapping(path = "/articles", method = RequestMethod.GET)
	public String initArticlesForm(Map<String, Object> model) {
		List<BlogArticle> articles = blogService.find(System.currentTimeMillis(), 20);
		model.put("articles", articles);
		return "blog/articles";
	}

	@RequestMapping(path = "/article", method = RequestMethod.GET)
	public String initArticleForm(@RequestParam("id") String articleId, Map<String, Object> model) {
		BlogArticle article = blogService.find(articleId);
		model.put("article", article);
		List<BlogComment> comments = blogService.find(articleId, System.currentTimeMillis(), 20);
		model.put("comments", comments);
		return "blog/article";
	}

	@RequestMapping(path = "/article-post", method = RequestMethod.GET)
	public String initArticleEditForm(Map<String, Object> model) {
		return "blog/article-post";
	}

	@RequestMapping(path = "/article-post-action", method = RequestMethod.GET)
	public String initArticlePostForm(@RequestParam("title") String title, @RequestParam("content") String content,
			@RequestParam("imgUrl") String imgUrl, Map<String, Object> model) throws UnsupportedEncodingException {
		LOGGER.info("Create article, [ title = {}, content = {}, imgUrl = {} ]", title, content, imgUrl);
		String accountId = "00000000000000000000000000000000";
		blogService.addArticle(accountId, title, content, imgUrl, System.currentTimeMillis());
		return "blog/article-post-success";
	}

}
