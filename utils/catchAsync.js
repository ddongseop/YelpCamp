// module.exports = func => {
// 	return (req, res, next) => {
// 		func(req, res, next).catch(next);
// 	}
// }

const tmp = func => {
	return (req, res, next) => {
		func(req, res, next).catch(next);
	}
}
module.exports = tmp;