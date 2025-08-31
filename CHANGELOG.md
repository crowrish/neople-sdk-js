# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

### Changed

### Removed

### Fixed

## [1.0.0] - 2025-08-31

### Changed
- **BREAKING**: First stable release - Production ready
- Updated TypeScript configuration (removed deprecated moduleResolution)
- Improved documentation accuracy and consistency across README files

### Added  
- Complete API coverage documentation (34 Dungeon Fighter + 11 Cyphers APIs)
- Enhanced project documentation with internal API clarification

### Fixed
- API count discrepancies in documentation 
- TypeScript configuration deprecation warnings
- README file consistency between Korean and English versions

## [0.2.6] - 2025-08-19

### Changed
- Minor version update for release alignment

## [0.2.5] - 2025-08-19

### Fixed
- API count discrepancies in documentation (47 → 45 APIs total)
- Corrected Cyphers API count from 13 to actual 11 implemented APIs
- Updated documentation dates to August 19, 2025
- Synchronized Korean and English README files with accurate counts

## [0.2.4] - 2025-08-19

### Added
- GitHub Actions CI/CD pipeline for automated testing across Node.js 16, 18, 20
- Comprehensive test coverage improvements (99.57% from 81%)
- 29 additional tests (202 total tests)
- Base client integration tests for all wrapper methods
- URL builder tests for all missing methods
- Test coverage badges and metrics in README

### Changed
- Updated neople-openapi-types dependency to 1.0.0
- Enhanced README documentation (both Korean and English versions)
- Improved Jest configuration for better CI stability
- Fixed Jest timeout cleanup to prevent hanging processes

### Removed
- Invalid Cyphers APIs that don't exist in official documentation:
  - `getPlayerEquipment()` method
  - `getRecommendItems()` method

### Fixed
- Jest hanging issues in CI/CD environment
- Timeout memory leaks in FetchAdapter
- Coverage threshold configuration
- API count discrepancies in documentation

## [0.2.3] - 2025-01-XX

### Added
- Complete Neople Open API support (45 APIs total)
- Dungeon Fighter APIs (34 total):
  - Basic information: `getServers()`, `getJobs()`
  - Character equipment: `getCharacterAvatar()`, `getCharacterCreature()`, `getCharacterFlag()`, `getCharacterTalisman()`
  - Skill system: `getCharacterSkillStyle()`, `getCharacterBuffSkillEquipment()`, `getCharacterBuffSkillAvatar()`, `getCharacterBuffSkillCreature()`
  - Skill information: `getSkillsByJob()`, `getSkillDetail()`, `getMultiSkills()`
  - Items: `getCharacterTimeline()`, `getSetItem()`, `searchSetItems()`, `getMultiItems()`, `getMultiSetItems()`, `getItemShop()`
  - Auction: `getCharactersByFame()`, `getAuctionSold()`, `getAuctionItem()`
  - Avatar market: `getAvatarMarketSale()`, `getAvatarMarketSold()`, `getAvatarMarketItem()`, `getAvatarMarketSoldItem()`
  - Hashtags: `getAvatarMarketHashtags()`, `getItemHashtags()`
- Cyphers APIs (11 total):
  - All essential player, match, ranking, and item APIs
  - TSJ ranking support: `getTsjRanking()`
  - Item management: `getCyphersItemDetail()`, `getCyphersMultiItems()`

### Changed
- Enhanced TypeScript type safety with neople-openapi-types integration
- Improved error handling across all HTTP adapters
- Updated documentation with accurate API counts and features
- Performance optimizations for URL building and parameter handling

### Fixed
- API parameter completeness based on official Neople documentation
- Type definition compatibility issues
- URL encoding for Korean characters
- Error message consistency across different HTTP adapters

## [0.2.2] - 2024-XX-XX

### Added
- Initial TypeScript SDK implementation
- HTTP adapter pattern support (FetchAdapter, AxiosAdapter, NodeFetchAdapter, GotAdapter)
- Basic Dungeon Fighter and Cyphers API clients
- Comprehensive error handling with NeopleApiError
- URL builder classes for flexible usage

### Changed
- Project structure optimization
- TypeScript configuration improvements

### Fixed
- Initial bug fixes and stability improvements

---

## Contributing

When adding entries to this changelog:

1. Use the format: `### [Added/Changed/Deprecated/Removed/Fixed/Security]`
2. Add entries to the `[Unreleased]` section first
3. Move entries to a version section when releasing
4. Follow [semantic versioning](https://semver.org/) for version numbers
5. Include links to issues/PRs where applicable

## Release Process

1. Update version in `package.json`
2. Move unreleased changes to new version section
3. Add release date
4. Create git tag: `git tag -a v0.2.4 -m "Release v0.2.4"`
5. Push tags: `git push origin --tags`
6. Publish to npm: `npm publish`