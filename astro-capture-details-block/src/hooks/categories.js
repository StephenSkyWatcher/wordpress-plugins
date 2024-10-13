const CATEGORY_IDS = {
    constellation: 11,
    catalogs: 4,
    stars: 79,
    blackHole: 56,
    solarSystem: 75,
    galaxies: 62
};

const categoriesHook = (select) => {
	const { getCurrentPostType, getCurrentPostId, getCurrentPostAttribute } = select('core/editor');
	const { getEntityRecords } = select('core');
	
	const postId = getCurrentPostId();
	const postType = getCurrentPostType();
	const constellation = getEntityRecords('taxonomy', 'category', { parent: CATEGORY_IDS.constellation, per_page: 100 });
	const catalog = getEntityRecords('taxonomy', 'category', { parent: CATEGORY_IDS.catalogs, per_page: 100 });
	const star = getEntityRecords('taxonomy', 'category', { parent: CATEGORY_IDS.stars, per_page: 100 });
	const blackhole = getEntityRecords('taxonomy', 'category', { parent: CATEGORY_IDS.blackHole, per_page: 100 });
	const solarsystem = getEntityRecords('taxonomy', 'category', { parent: CATEGORY_IDS.solarSystem, per_page: 100 });
	const galaxies = getEntityRecords('taxonomy', 'category', { parent: CATEGORY_IDS.galaxies, per_page: 100 });

	const postCategories = {
		constellation,
		catalog,
		star,
		blackhole,
		solarsystem,
		galaxies,
		all: getEntityRecords('taxonomy', 'category', { per_page: 100 })
	}

	return {
		currentCategories: wp.data.select("core/editor").getCurrentPostAttribute("categories"),
		postCategories,
		postId,
		postType,
	};
}

export default categoriesHook;