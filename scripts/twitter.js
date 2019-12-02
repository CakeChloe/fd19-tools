

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

var twitter = new function() {
	this.context = $("#canvas")[0].getContext("2d");

	this.context.font = "14px Segoe UI";

	this.update = function() {
		twitter.context.clearRect(0, 0, 1000, 1000);

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

		  const steps = (oc.width / 48)>>1;
		  octx.filter = `blur(${steps}px)`;
		  octx.drawImage(this, 0, 0);

			twitter.context.drawImage(oc, 12, 12, 48, 48);

			oc.remove();
		};

		// general texts
		let currentWidth = 12 + 48 + 12;

		// profile name
		let profileName = $("#profile-name").val();

		twitter.context.font = "bold 14px Segoe UI";
		twitter.context.fillStyle = "#14171a";
		twitter.context.fillText(profileName, currentWidth, 24);
		currentWidth += twitter.context.measureText(profileName).width;

		// verified
		let verified = $("#verified").val();

		if(verified == 0) {
			currentWidth += 2;

			let breadth = currentWidth;

			let verifiedImage = new Image();
			verifiedImage.src = "images/verified.png";
			verifiedImage.onload = function() {
				twitter.context.drawImage(verifiedImage, breadth, 10);
			};

			currentWidth += 17;
		}

		// account name
		let accountName = "@" + $("#account-name").val();

		currentWidth += 2;

		twitter.context.font = "14px Segoe UI";
		twitter.context.fillStyle = "#657786";
		twitter.context.fillText(accountName, currentWidth, 24);
		currentWidth += twitter.context.measureText(accountName).width;

		// lmao this dot
		currentWidth += 4;

		let dotBreadth = currentWidth;

		let dotImage = new Image();
		dotImage.src = "images/loldot.png";
		dotImage.onload = function() {
			twitter.context.drawImage(dotImage, dotBreadth, 18);
		};

		// date
		let dateMonth = $("#date-month option:selected").text().substr(0, 3) + " " + $("#date-day").val();

		currentWidth += 6;

		twitter.context.fillText(dateMonth, currentWidth, 24);
		currentWidth += twitter.context.measureText(dateMonth).width;

		// content
		currentWidth = 12 + 48 + 12;

		let content = $("#content").val();

		twitter.context.font = "14px Segoe UI";
		twitter.context.fillStyle = "#14171a";

		let breaks = 0;

		/*for(let index = 0, length = content.length; index < length; index++) {
			if(index == '\n') {
				breaks = index + 1;

				continue;
			}

			if(twitter.context.measureText(content.substr(breaks, index)).width >= 490) {
				content = content.substr(0, index) + "\n" + content.substr(index, length);
				breaks = index + 1;
			}
		}*/

		let currentHeight = 43;

		let textBreadth = 0, hashTag = 0;

		twitter.context.fillStyle = "#14171a";

		for(let character = 0; character < content.length; character++) {
			if((content[character] == '#' || content[character] == '@') && content[character + 1].match(/[a-z]/i)) {
				hashTag = 1;

				twitter.context.fillStyle = $("#profile-color").val();
			}
			else if(hashTag == 1 && !content[character].match(/[a-z]/i)) {
				hashTag = 0;

				twitter.context.fillStyle = "#14171a";
			}

			if(textBreadth >= 500 || content[character] == '\n') {
				textBreadth = 0;

				currentHeight += 20;

				if(content[character] == '\n')
					continue;
			}

			twitter.context.fillText(content[character], currentWidth + textBreadth, currentHeight);

			textBreadth += twitter.context.measureText(content[character]).width;
		}

		currentHeight += 20;

		/*var lines = content.split('\n');
		for(let index = 0; index < lines.length; index++) {
			currentHeight += 20;
			currentWidth = 12 + 48 + 12;

			twitter.context.fillStyle = "#14171a";
			twitter.context.fillText(lines[index], currentWidth, 43 + (index * 20));
		}*/


		//image
		if(twitter.image != undefined) {
			let customImage = new Image();
			customImage.src = twitter.image;
			customImage.onload = function() {
				const oc = document.createElement('canvas');
			  const octx = oc.getContext('2d');
			  oc.width = this.width;
			  oc.height = this.height;

			  const steps = (oc.width / 400)>>1;
			  octx.filter = `blur(${steps}px)`;
			  octx.drawImage(this, 0, 0);

				twitter.context.drawImage(oc, currentWidth, currentHeight);

				oc.remove();
			};
		}

		// tools
		let toolsBreadth = currentWidth;

		let toolsImage = new Image();
		toolsImage.src = "images/tools.png";
		toolsImage.onload = function() {
			twitter.context.drawImage(toolsImage, toolsBreadth, currentHeight - 60);
		};
		
		twitter.context.font = "12px Segoe UI";
		twitter.context.fillStyle = "#657786";

		let comments = $("#comments").val();

		if(comments != 0) {
			twitter.context.fillText(comments, currentWidth + 40, currentHeight + 10);
		}

		let retweets = $("#retweets").val();

		if(retweets != 0) {
			twitter.context.fillText(retweets, currentWidth + 177, currentHeight + 10);
		}

		let likes = $("#likes").val();

		if(likes != 0) {
			twitter.context.fillText(likes, currentWidth + 315, currentHeight + 10);
		}

		currentHeight += 35 + 22;

		setTimeout(function() {
			let cvsimg = $("#canvas")[0];

			$("#render-canvas").attr("height", currentHeight - 30);

			let context = $("#render-canvas")[0].getContext("2d");

			context.fillStyle = "#FFF";
			context.fillRect(0, 0, 590, currentHeight);
			context.drawImage(cvsimg, 0, 0);
		}, 500);
	};

	this.render = function() {
		$(".render").css("display", "flex").hide().fadeIn();
	};

	this.upload = function() {
		let img = $("#render-canvas")[0];

		
		
	};

	$("body").bind("input", function() {
		twitter.update();
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
			twitter.update();
		}, 200);
	});

	$("#image").change(function() {
		previewFile(function(source) {
			twitter.image = source;
		
			twitter.update();
		});
	});

	$("#imgur").click(function() {
		twitter.upload();

		new Imgur($("#render-canvas")[0]).upload(function(data) {
			window.location = data.link;
		});
	});

	$(".render").click(function() {
		$(this).fadeOut();
	});
};

twitter.update();