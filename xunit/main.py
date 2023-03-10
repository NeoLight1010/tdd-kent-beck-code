from __future__ import annotations


class TestSuite:
    def __init__(self) -> None:
        self.tests: list[TestCase] = []

    def add(self, test: TestCase) -> None:
        self.tests.append(test)

    def run(self, result: TestResult) -> None:
        for test in self.tests:
            test.run(result)


class TestCase:
    def __init__(self, name: str) -> None:
        self.name = name

    def set_up(self) -> None:
        pass

    def tear_down(self) -> None:
        pass

    def run(self, result: TestResult) -> None:
        result.test_started()

        self.set_up()

        try:
            method = getattr(self, self.name)
            method()
        except:
            result.test_failed()

        self.tear_down()

class TestResult:
    def __init__(self) -> None:
        self.run_count = 0
        self.error_count = 0

    def test_started(self) -> None:
        self.run_count += 1

    def test_failed(self) -> None:
        self.error_count += 1

    def summary(self) -> str:
        return f"{self.run_count} run, {self.error_count} failed"

class WasRun(TestCase):
    def __init__(self, name: str) -> None:
        super().__init__(name)

    def set_up(self) -> None:
        self.was_run = None
        self.log = "set_up "

    def tear_down(self) -> None:
        self.log = self.log + "tear_down "

    def test_method(self) -> None:
        self.was_run = 1
        self.log = self.log + "test_method "

    def test_broken_method(self) -> None:
        raise Exception()

class TestCaseTest(TestCase):
    def set_up(self) -> None:
        self.result = TestResult()

    def test_template_method(self) -> None:
        test = WasRun("test_method")
        test.run(self.result)

        assert test.log == "set_up test_method tear_down "

    def test_result(self) -> None:
        test = WasRun("test_method")
        test.run(self.result)

        assert self.result.summary() == "1 run, 0 failed"

    def test_failed_result(self) -> None:
        test = WasRun("test_broken_method")
        test.run(self.result)

        assert self.result.summary() == "1 run, 1 failed"

    def test_failed_result_formatting(self) -> None:
        result = TestResult()
        result.test_started()
        result.test_failed()

        assert result.summary() == "1 run, 1 failed"

    def test_suite(self) -> None:
        suite = TestSuite()
        suite.add(WasRun("test_method"))
        suite.add(WasRun("test_broken_method"))

        suite.run(self.result)

        assert self.result.summary() == "2 run, 1 failed"


def _main() -> None:
    suite = TestSuite()

    suite.add(TestCaseTest("test_template_method"))
    suite.add(TestCaseTest("test_result"))
    suite.add(TestCaseTest("test_failed_result"))
    suite.add(TestCaseTest("test_failed_result_formatting"))
    suite.add(TestCaseTest("test_suite"))

    result = TestResult()
    suite.run(result)

    print(result.summary())

if __name__ == "__main__":
    _main()

# TODO
# - [x] Invoke test method
# - [x] Invoke set_up first
# - [x] Invoke tear_down afterward
# - [ ] Invoke tear_down even if the test method fails
# - [x] Run multiple tests
# - [x] Report collected results
# - [x] Log string in WasRun
# - [x] Report failed tests
# - [ ] Catch and report set_up errors
# - [ ] Create TestSuite from a TestCase class
