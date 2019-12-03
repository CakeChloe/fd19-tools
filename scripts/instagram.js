

String.prototype.insert = function (index, string) {
  if (index > 0)
    return this.substring(0, index) + string + this.substring(index, this.length);

  return string + this;
};

const insertAt = (str, sub, pos) => `${str.slice(0, pos)}${sub}${str.slice(pos)}`;

function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}

function previewFile(finished) {
  var file    = document.querySelector('input[type=file]').files[0];
  var reader  = new FileReader();

  reader.onloadend = function () {
    finished(reader.result);
  }

  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.src = "";
  }
}

var instagram = new function() {
	this.context = $("#canvas")[0].getContext("2d");

	this.context.font = "14px Segoe UI";

	this.update = function() {
		return new Promise(resolve => {
			instagram.context.clearRect(0, 0, 1000, 1000);

			instagram.context.fillStyle = "black";
			instagram.context.fillRect(0, 0, 1000, 1000);

			let img = new Image();
			img.onload = function() {
				instagram.context.drawImage(img, instagram.imageLeft, instagram.imageTop, $("#imager img").width(), $("#imager img").height());

			};
			img.src = $("#imager img")[0].src;

			let instagramImage = new Image();
			instagramImage.src = "images/instagram.png";
			instagramImage.onload = function() {
				instagram.context.drawImage(instagramImage, 0, 0);

				// profile picture
				let picture = $("#profile-picture").val();

				if(picture == 0) // @lafd
					picture = "lsfd";
				else if(picture == 1)
					picture = "lsfdtalk";
				else
					picture = "dtls";

				let image = new Image();
				image.src = "images/avatars/" + picture + ".png";
				image.onload = function() {
					const oc = document.createElement('canvas');
				  const octx = oc.getContext('2d');
				  oc.width = this.width;
				  oc.height = this.height;

				  const steps = (oc.width / 34)>>1;
				  octx.filter = `blur(${steps}px)`;
				  octx.drawImage(this, 0, 0);

					instagram.context.drawImage(oc, 510, 20, 34, 34);

					oc.remove();

					let story = $("#story").val();

					if(story == 0) {
						let storyImage = new Image();
						storyImage.src = "images/story.png";
						storyImage.onload = function() {
							instagram.context.drawImage(storyImage, 511 - 4, 17);
						};
					}
				};

				// general texts
				let currentWidth = 559;

				// profile name
				let profileName = $("#account-name").val();

				instagram.context.font = "600 14px Segoe UI";
				instagram.context.fillStyle = "#000";
				instagram.context.fillText(profileName, currentWidth, 42);
				currentWidth += instagram.context.measureText(profileName).width;

				// verified
				let verified = $("#verified").val();

				if(verified == 0) {
					currentWidth += 5;

					let breadth = currentWidth;

					let verifiedImage = new Image();
					verifiedImage.src = "images/verified-ig.png";
					verifiedImage.onload = function() {
						instagram.context.drawImage(verifiedImage, breadth, 32);
					};

					currentWidth += 12;
				}

				currentWidth += 4;

				// lmao this dot

				let dotBreadth = currentWidth;

				let dotImage = new Image();
				dotImage.src = "images/loldot.png";
				dotImage.onload = function() {
					instagram.context.drawImage(dotImage, dotBreadth, 37);
				};

				currentWidth += 6;

				instagram.context.font = "semibold 14px Segoe UI";
				instagram.context.fillStyle = "#3897f0";
				instagram.context.fillText("Follow", currentWidth, 42);
				currentWidth += instagram.context.measureText(profileName).width;

				// date
				let likes = $("#likes").val();

				instagram.context.font = "semibold 14px Segoe UI";
				instagram.context.fillStyle = "#262626";
				instagram.context.fillText(likes + " likes", 512, 508);

				let dateMonth = $("#date-month option:selected").text().toUpperCase() + " " + $("#date-day").val();

				instagram.context.font = "10px Segoe UI";
				instagram.context.fillStyle = "#999";
				instagram.context.fillText(dateMonth, 512, 530);

				//image
				/*if(instagram.image != undefined) {
					let customImage = new Image();
					customImage.src = instagram.image;
					customImage.onload = function() {
						const oc = document.createElement('canvas');
					  const octx = oc.getContext('2d');
					  oc.width = this.width;
					  oc.height = this.height;

					  const steps = (oc.height / 598)>>1;
					  octx.filter = `blur(${steps}px)`;
					  octx.drawImage(this, 0, 0);

						instagram.context.drawImage(oc, (this.width - 492) / 2, (this.height - 598) / 2, 492, 598, 1, 1, 492, 598);

						oc.remove();
					};
				}*/

				let commentHeight = 95;

				// comments
				$("#comments").children("#comment").each(function () {
					let commentBreadth = 511;

					let cmtPicture = $(this).find("#profile-picture").val();

					if(cmtPicture == 0) // @lafd
						cmtPicture = "lsfd";
					else if(cmtPicture == 1)
						cmtPicture = "lsfdtalk";
					else
						cmtPicture = "dtls";

					let pictureHeight = commentHeight;


					let story = $(this).find("#story").val();

					let image = new Image();
					image.src = $(this).find("#profile-picture").val();
					image.onload = function() {
						const oc = document.createElement('canvas');
					  const octx = oc.getContext('2d');
					  oc.width = this.width;
					  oc.height = this.height;

					  const steps = (oc.width / 36)>>1;
					  octx.filter = `blur(${steps}px)`;
					  octx.drawImage(this, 0, 0);

					  instagram.context.save();

					  instagram.context.beginPath();
					  instagram.context.arc(511 + 16, pictureHeight + 5, 28, 0, Math.PI * 2, true);
						instagram.context.clip();

						instagram.context.drawImage(oc, 511 - 2, pictureHeight - 2, 36, 36);

					  instagram.context.restore();

						oc.remove();

						if(story == 1) {
							let storyImage = new Image();
							storyImage.src = "images/story.png";
							storyImage.onload = function() {
								instagram.context.drawImage(storyImage, 511 - 4, pictureHeight - 4);
							};
						}
					};

					commentBreadth += 48;

					let profileName = $(this).find("#author").val();

					instagram.context.font = "600 14px Segoe UI";
					instagram.context.fillStyle = "#262626";
					instagram.context.fillText(profileName, commentBreadth, commentHeight + 16);
					commentBreadth += instagram.context.measureText(profileName).width;

					let verified = $(this).find("#verified").val();

					if(verified == 1) {
						commentBreadth += 5;

						let commentHeightVer = commentHeight;

						let breadth = commentBreadth;

						let verifiedImage = new Image();
						verifiedImage.src = "images/verified-ig.png";
						verifiedImage.onload = function() {
							instagram.context.drawImage(verifiedImage, breadth, commentHeightVer + 6);
						};

						commentBreadth += 12;
					}

					commentBreadth += 4;

					let hashTag = 0, content = $(this).find("#content").val();

					instagram.context.font = "14px Segoe UI";
					instagram.context.fillStyle = "#14171a";

					commentHeight += 16;

					for(let character = 0; character < content.length; character++) {
						if((content[character] == '#' || content[character] == '@') && content[character + 1].match(/[a-z]/i)) {
							hashTag = 1;

							instagram.context.fillStyle = "#003569";
						}
						else if(hashTag == 1 && !content[character].match(/[a-z]/i)) {
							hashTag = 0;

							instagram.context.fillStyle = "#14171a";
						}

						if(commentBreadth >= 511 + 48 + 240 || content[character] == '\n') {
							commentBreadth = 511 + 48;

							commentHeight += 20;

							if(content[character] == '\n')
								continue;
						}

						instagram.context.fillText(content[character], commentBreadth, commentHeight);

						commentBreadth += instagram.context.measureText(content[character]).width;
					}

					commentHeight += 28;

					commentBreadth = 511 + 48;

					let dateMonth = $(this).find("#time-elapsed").val();

					instagram.context.font = "14px Segoe UI";
					instagram.context.fillStyle = "#999";
					instagram.context.fillText(dateMonth, commentBreadth, commentHeight);

					commentBreadth += instagram.context.measureText(dateMonth).width + 8;

					instagram.context.font = "400 12px Segoe UI";
					instagram.context.fillText("Reply", commentBreadth, commentHeight);

					commentHeight += 28;

				});
			}

			resolve(1);
		});
	};

	this.render = function() {
		$(".render").css("display", "flex").hide().fadeIn();
	};

	this.upload = function() {
		let img = $("#render-canvas")[0];

		
		
	};

	$("body").bind("input", function() {
		instagram.update();
	});

	$("#preset-content").change(function() {
		let type = $("#preset-content option:selected").val();

		if(type == 0)
			$("#content").text("");
		else if(type == 1)
			$("#content").text("REMINDER: A short and informative reminder here.\n\n* To Report an Emergency in #LosSantos: Call or Text 911\n* For Non-Emergency @LSCity Services: Call 311");
		else if(type == 2)
			$("#content").text("#Keyword; INC#0000; 0:00AM; 123 N Main Street; #Temple; incident information goes here...");

		setTimeout(function() {
			instagram.update();
		}, 200);
	});

	$("#add-comment").click(function() {
		let id = Math.floor(Math.random() * 100001);

		let $element = $(
'<form id="comment" style="border-bottom: 1px solid rgba(0, 0, 0, .5); padding-bottom: 6px; margin-top: 6px;" onsubmit="return false">' +
'<fieldset>' +
'Author:' +
'<ul>' +
'<li>Presets:</li> ' +
'<li onclick="$(\'#author[data-id=' + id + ']\').val(\'losangelesfiredepartment\'); instagram.update()">losangelesfiredepartment</li>' +
'</ul>' +
'</fieldset>' +
'<input id="author" type="text" placeholder="losangelesfiredepartment" value="lossantosfiredepartment" data-id="' + id + '">' +
'<fieldset>Profile Picture:' +
'<ul>' +
'<li>Presets:</li> ' +
'<li onclick="$(\'#profile-picture[data-id=' + id + ']\').val(\'https://i.imgur.com/adBpbwH.png\'); instagram.update()">LAFD talk</li>' +
'</ul>' +
'</fieldset>' +
'<input id="profile-picture" type="text" placeholder="Image link" value="https://i.imgur.com/adBpbwH.png" data-id="' + id + '">' +
'<fieldset>' +
'Time Elapsed:' +
'<ul>' +
'<li>Presets:</li> ' +
'<li onclick="$(\'#time-elapsed[data-id=' + id + ']\').val(\'1s\'); instagram.update()">1s</li>, ' +
'<li onclick="$(\'#time-elapsed[data-id=' + id + ']\').val(\'1d\'); instagram.update()">1d</li>, ' +
'<li onclick="$(\'#time-elapsed[data-id=' + id + ']\').val(\'1m\'); instagram.update()">1m</li>, ' +
'<li onclick="$(\'#time-elapsed[data-id=' + id + ']\').val(\'1y\'); instagram.update()">1y</li>' +
'</ul>' +
'</fieldset>' +
'<input id="time-elapsed" type="text" placeholder="1d, 1w, 1m, 1y..." value="1d" data-id="' + id + '">' +
'<fieldset>Verified:</fieldset>' +
'<select id="verified">' +
'<option value="1">Yes</option>' +
'<option value="0">No</option>' +
'</select>' +
'<fieldset>Has Story:</fieldset>' +
'<select id="story">' +
'<option value="1">Yes</option>' +
'<option value="0">No</option>' +
'</select>' +
'<fieldset>' +
'Comment:' +
'</fieldset>' +
'<textarea id="content" placeholder="Enter comment content... (max 280 letters)" rows="6"></textarea>' +
'						<fieldset></fieldset>' +
'						<input id="delete-comment" type="submit" value="Delete">' +
'					</form>').appendTo("#comments");

		$element.find("#delete-comment").click(function() {
			$element.remove();

			instagram.update();
		});
		
		instagram.update();
	});

	$("#image").change(function() {
		previewFile(function(source) {
			instagram.image = source;



			$("#canvas-imager img")[0].onload = function() {
				$("#image-snap").css({
					"width": $("#canvas-imager img")[0].width + "px",
					"height": $("#canvas-imager img")[0].height + "px"
				});


				$("#canvas-imager img").css({
					"width": $("#canvas-imager img")[0].width + "px",
					"height": $("#canvas-imager img")[0].height + "px"
				});

				$("#imager").css({
					"width": $("#canvas-imager img")[0].width + "px",
					"height": $("#canvas-imager img")[0].height + "px"
				}).draggable({
					snap: ".snap",
					cancel: ".ui-resizable-handle",

					stop: function(event, ui) {
						instagram.imageLeft = ui.position.left;
						instagram.imageTop = ui.position.top;

						instagram.update();
					}
				}).resizable({
					aspectRatio: true,

					handles: {
						ne: ".top-right",
						se: ".bottom-right",
						sw: ".bottom-left",
						nw: ".top-left"
					},
					resize: function(event, ui) {
    				let height = ui.size.height;
    				let width = ui.size.width;

    				$("#image-snap-scale").css({
							"width": width + "px",
							"height": height + "px"
						});

						$("#canvas-imager img").css({
							"width": width + "px",
							"height": height + "px"
						});
					},

					stop: function(event, ui) {
						instagram.update();
					}
				}).show();

				instagram.imageLeft = 1;
				instagram.imageTop = 1;
			
				instagram.update();
			};

			$("#canvas-imager img")[0].src = source;
		});
	});

	$("#render-button").click(async function() {
		await instagram.update();

		new Imgur($("#canvas")[0]).upload(function(data) {
			window.location = data.link;
		});
	});
};

instagram.update();
